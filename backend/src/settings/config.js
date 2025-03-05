

export const {
    PORT = 3000,

    SALT_ROUNDS = 15,

    DB_PASS = "giuLrirq0Wqr4ZXp",

    MONGO_CLUSTER_TEST = `mongodb+srv://ppuchetadev:${DB_PASS}@clustertestconection.secyw.mongodb.net/?retryWrites=true&w=majority&appName=ClusterTestConection`,

    TEST = true

} = process.env