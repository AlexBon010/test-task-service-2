## 🚀 Quick Start

**Prerequisites:** Apply Docker Compose from the first microservice first!

Create a `.env` or `.env.development` file in the project root with the following variables:

```env
APP_MODE=development
APP_PORT=3001

REDIS_PORT=6379
REDIS_HOST=localhost

KAFKA_PORT=9092
KAFKA_HOST=localhost
KAFKA_LOGS_CLIENT=logs-consumer
KAFKA_CONSUMER_GROUP_ID=logs-consumer-group

ELASTICSEARCH_PORT=9200
ELASTICSEARCH_HOST=localhost
```

Start the project:

```bash
npm ci
npm run start:dev
```

Hint: API docs available at GET /api
