import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createServer } from 'http';
import authRoutes from './routes/authRoutes';
import productRoutes from './routes/productRoutes';
import orderRoutes from './routes/orderRoutes';
import recommendationRoutes from './routes/recommendationRoutes';
import loyaltyRoutes from './routes/loyalty';
import metaverseRoutes from './routes/metaverse';
import stylistRoutes from './routes/stylist';

dotenv.config();

const app = express();
const httpServer = createServer(app);

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/recommendations', recommendationRoutes);
app.use('/api/loyalty', loyaltyRoutes);
app.use('/api/metaverse', metaverseRoutes);
app.use('/api/stylist', stylistRoutes);

const PORT = process.env.PORT || 3001;
httpServer.listen(PORT, () => console.log(`🚀 Servidor rodando na porta ${PORT}`));
