import * as dotenv from 'dotenv';

dotenv.config();

export const config = {
    configModule: {
        Options: {
            cache: false,
        }
    },
    mongoModule: {
        Connection: process.env.DATABASE_URL,
        Database: process.env.DATABASE_DEFAULT_TENANT,
        Options: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        },
    },
    eventEmitterModule: {
        Options: {
            global: true,
        }
    },
    classTransform: {
        Options: {
            enableImplicitConversion: false,
        }
    },
}