package config

import "time"

type Config struct {
	AppJWTSecret  string
	MongoDBURI    string
	DBName        string
	MongoTimeout  time.Duration
	MongoPoolSize uint64
	ServerAddress string
}

func Load() *Config {
	return &Config{
		AppJWTSecret:  "MeSecret",
		MongoDBURI:    "mongodb://host.docker.internal:27017/?replicaSet=rs0",
		DBName:        "meManagerDB",
		MongoTimeout:  10 * time.Second,
		MongoPoolSize: 100,
		ServerAddress: ":6969",
	}
}
