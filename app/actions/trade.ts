'use server';

import { prisma } from '../lib/db';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

const tradeSchema = z.object({
  symbol: z.string().min(1, 'Symbol is required'),
  type: z.enum(['LONG', 'SHORT']),
  instrumentType: z.enum(['STOCK', 'FUTURES', 'OPTIONS']).default('STOCK'),
  entryPrice: z.number().positive('Entry price must be positive'),
  exitPrice: z.number().optional().nullable(),
  quantity: z.number().positive('Quantity must be positive'),
  strikePrice: z.number().positive('Strike price must be positive').optional().nullable(),
  expiryDate: z.string().optional().nullable(),
  optionType: z.enum(['CALL', 'PUT']).optional().nullable(),
  premium: z.number().optional().nullable(),
  entryDate: z.string(),
  exitDate: z.string().optional().nullable(),
  profitLoss: z.number().optional().nullable(),
  notes: z.string().optional().nullable(),
  sector: z.string().optional().nullable(),
  
  // New fields
  strategy: z.string().optional().nullable(),
  setupImageUrl: z.string().optional().nullable(),
  preTradeEmotion: z.string().optional().nullable(),
  postTradeEmotion: z.string().optional().nullable(),
  tradeConfidence: z.number().min(1).max(10).optional().nullable(),
  tradeRating: z.number().min(1).max(10).optional().nullable(),
  lessons: z.string().optional().nullable(),
  riskRewardRatio: z.number().positive().optional().nullable(),
  stopLoss: z.number().optional().nullable(),
  targetPrice: z.number().optional().nullable(),
  timeFrame: z.string().optional().nullable(),
  marketCondition: z.string().optional().nullable(),
});

export type TradeFormData = z.infer<typeof tradeSchema>;

export async function getTrades() {
  return prisma.trade.findMany({
    orderBy: { entryDate: 'desc' },
  });
}

export async function getTradesByDate(date: Date) {
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);
  
  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);
  
  return prisma.trade.findMany({
    where: {
      entryDate: {
        gte: startOfDay,
        lte: endOfDay,
      },
    },
  });
}

export async function createTrade(data: TradeFormData) {
  const validatedData = tradeSchema.parse(data);
  
  const trade = await prisma.trade.create({
    data: {
      symbol: validatedData.symbol,
      type: validatedData.type,
      instrumentType: validatedData.instrumentType,
      entryPrice: validatedData.entryPrice,
      exitPrice: validatedData.exitPrice || null,
      quantity: validatedData.quantity,
      strikePrice: validatedData.strikePrice || null,
      expiryDate: validatedData.expiryDate ? new Date(validatedData.expiryDate) : null,
      optionType: validatedData.optionType || null,
      premium: validatedData.premium || null,
      entryDate: new Date(validatedData.entryDate),
      exitDate: validatedData.exitDate ? new Date(validatedData.exitDate) : null,
      profitLoss: validatedData.profitLoss || null,
      notes: validatedData.notes || null,
      sector: validatedData.sector || null,
      strategy: validatedData.strategy || null,
      setupImageUrl: validatedData.setupImageUrl || null,
      preTradeEmotion: validatedData.preTradeEmotion || null,
      postTradeEmotion: validatedData.postTradeEmotion || null,
      tradeConfidence: validatedData.tradeConfidence || null,
      tradeRating: validatedData.tradeRating || null,
      lessons: validatedData.lessons || null,
      riskRewardRatio: validatedData.riskRewardRatio || null,
      stopLoss: validatedData.stopLoss || null,
      targetPrice: validatedData.targetPrice || null,
      timeFrame: validatedData.timeFrame || null,
      marketCondition: validatedData.marketCondition || null,
    },
  });
  
  revalidatePath('/trades');
  revalidatePath('/calendar');
  revalidatePath('/analytics');
  revalidatePath('/heatmaps');
  revalidatePath('/');
  
  return trade;
}

export async function updateTrade(id: number, data: TradeFormData) {
  const validatedData = tradeSchema.parse(data);
  
  const trade = await prisma.trade.update({
    where: { id },
    data: {
      symbol: validatedData.symbol,
      type: validatedData.type,
      instrumentType: validatedData.instrumentType,
      entryPrice: validatedData.entryPrice,
      exitPrice: validatedData.exitPrice || null,
      quantity: validatedData.quantity,
      strikePrice: validatedData.strikePrice || null,
      expiryDate: validatedData.expiryDate ? new Date(validatedData.expiryDate) : null,
      optionType: validatedData.optionType || null,
      premium: validatedData.premium || null,
      entryDate: new Date(validatedData.entryDate),
      exitDate: validatedData.exitDate ? new Date(validatedData.exitDate) : null,
      profitLoss: validatedData.profitLoss || null,
      notes: validatedData.notes || null,
      sector: validatedData.sector || null,
      strategy: validatedData.strategy || null,
      setupImageUrl: validatedData.setupImageUrl || null,
      preTradeEmotion: validatedData.preTradeEmotion || null,
      postTradeEmotion: validatedData.postTradeEmotion || null,
      tradeConfidence: validatedData.tradeConfidence || null,
      tradeRating: validatedData.tradeRating || null,
      lessons: validatedData.lessons || null,
      riskRewardRatio: validatedData.riskRewardRatio || null,
      stopLoss: validatedData.stopLoss || null,
      targetPrice: validatedData.targetPrice || null,
      timeFrame: validatedData.timeFrame || null,
      marketCondition: validatedData.marketCondition || null,
    },
  });
  
  revalidatePath('/trades');
  revalidatePath('/calendar');
  revalidatePath('/analytics');
  revalidatePath('/heatmaps');
  revalidatePath('/');
  
  return trade;
}

export async function deleteTrade(id: number) {
  await prisma.trade.delete({
    where: { id },
  });
  
  revalidatePath('/trades');
  revalidatePath('/calendar');
  revalidatePath('/analytics');
  revalidatePath('/heatmaps');
  revalidatePath('/');
} 