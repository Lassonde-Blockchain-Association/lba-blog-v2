import express from "express"
import { createExpressMiddleware } from "@trpc/server/adapters/express"
import { appRouter } from "./routes/appRouter"
import cors from "cors"
import { corsConfig } from "./config/cors"
import { createAuthContext } from "./lib/context/auth.context"

const app = express()
app.use(express.json())
app.use(cors(corsConfig))

app.use("/api/trpc", createExpressMiddleware({ router: appRouter, createContext:createAuthContext }))

const port = process.env.PORT ? process.env.PORT : 3001
app.listen(port, () => {
    console.log(`🌠 Server listening on port ${port}`)
})

export default app
