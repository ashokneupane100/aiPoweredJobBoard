This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Local PostgreSQL

The project includes a PostgreSQL service in `docker-compose.yml`. On Ubuntu, follow the [official Docker Engine installation instructions](https://docs.docker.com/engine/install/ubuntu/) to configure Docker's apt repository, then install and start Docker:

```bash
sudo apt update
sudo apt install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
sudo systemctl enable --now docker
sudo docker run hello-world
```

Verify Docker and Compose are installed:

```bash
docker --version
docker compose version
```

If your account does not have permission to access Docker, prefix the Docker commands below with `sudo`. Adding a user to the `docker` group avoids `sudo` but gives that user root-equivalent privileges.

Compose and the Next.js server read database settings from the root `.env` file. Keep that file private and do not commit it. The supplied password is weak: use it only for a local development database, and change it to a unique strong password before using this setup anywhere shared or public. The database port is bound to `127.0.0.1` so it is not exposed to other machines. This project uses host port `5433` because another PostgreSQL server is already listening on `5432`. Compose maps `DB_PORT` on your computer to port `5432` inside the database container; with `DB_HOST=localhost`, the app connects to `localhost:5433`.

Start PostgreSQL and check that it is healthy:

```bash
sudo docker compose config -q
sudo docker compose up -d db
sudo docker compose ps
sudo docker compose logs db
```

Then start the Next.js app in a separate terminal and check the database connection:

```bash
npm run dev
```

Open `http://localhost:3000/api/db-health`. A successful response is `{"database":"connected"}`. If it returns `503`, check that PostgreSQL is running with `sudo docker compose ps` and inspect its output with `sudo docker compose logs db`.

Stop the container while retaining database data:

```bash
sudo docker compose down
```

The named `pgdata` volume preserves the database across container restarts. `docker compose down -v` also deletes that volume and its data. PostgreSQL uses `DB_USER`, `DB_PASSWORD`, and `DB_NAME` when it initializes an empty volume; changing those values later does not change credentials in an already-initialized database.

Docker runs PostgreSQL in an isolated container; the named volume keeps its database files between container restarts. The app itself runs on your computer, so it uses `localhost` and the published host port. Drizzle is the app's database client/ORM, and the health endpoint performs a harmless `select 1` query to verify connectivity. The project does not yet define job-board tables; those can be added when we decide what data the app needs to store.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
# aiPoweredJobBoard
