import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getProducts = async (req: Request, res: Response) => {
  const { category, search } = req.query;
  const where: any = {};
  if (category) where.category = category;
  if (search) where.name = { contains: search as string, mode: 'insensitive' };
  
  const products = await prisma.product.findMany({ where });
  res.json(products);
};

export const getProduct = async (req: Request, res: Response) => {
  const product = await prisma.product.findUnique({ where: { id: req.params.id } });
  if (!product) return res.status(404).json({ error: 'Produto não encontrado' });
  res.json(product);
};

export const createProduct = async (req: Request, res: Response) => {
  const product = await prisma.product.create({ data: req.body });
  res.status(201).json(product);
};

export const updateProduct = async (req: Request, res: Response) => {
  const product = await prisma.product.update({
    where: { id: req.params.id },
    data: req.body
  });
  res.json(product);
};

export const deleteProduct = async (req: Request, res: Response) => {
  await prisma.product.delete({ where: { id: req.params.id } });
  res.status(204).send();
};
