pm2 del tg_bot_skill_seeker
git reset --hard HEAD
git pull origin main
npm i
npm run build
cp .env build/
pm2 start pm2-config.json

pm2 logs