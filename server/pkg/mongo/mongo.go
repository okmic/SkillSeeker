package mongo

import (
	"context"
	"log"
	"sync"

	"app/pkg/config"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var (
	client     *mongo.Client
	clientOnce sync.Once
	db         *mongo.Database
)

func Init(cfg *config.Config) *mongo.Database {
	clientOnce.Do(func() {
		ctx, cancel := context.WithTimeout(context.Background(), cfg.MongoTimeout)
		defer cancel()

		clientOptions := options.Client().
			ApplyURI(cfg.MongoDBURI).
			SetConnectTimeout(cfg.MongoTimeout / 2).
			SetServerSelectionTimeout(cfg.MongoTimeout / 2).
			SetMaxPoolSize(cfg.MongoPoolSize)

		var err error
		client, err = mongo.Connect(ctx, clientOptions)
		if err != nil {
			log.Fatalf("Failed to connect to MongoDB: %v", err)
		}

		err = client.Ping(ctx, nil)
		if err != nil {
			log.Fatalf("Failed to ping MongoDB: %v", err)
		}

		db = client.Database(cfg.DBName)
		log.Println("MongoDB connected successfully")
	})

	return db
}

func GetDB() *mongo.Database {
	if db == nil {
		log.Fatal("MongoDB not initialized. Call Init() first")
	}
	return db
}

func Close(ctx context.Context) error {
	if client != nil {
		return client.Disconnect(ctx)
	}
	return nil
}
