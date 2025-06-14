-- CreateTable
CREATE TABLE "Trade" (
  "id" SERIAL NOT NULL,
  "symbol" TEXT NOT NULL,
  "type" TEXT NOT NULL,
  "instrumentType" TEXT NOT NULL DEFAULT 'STOCK',
  "entryPrice" DOUBLE PRECISION NOT NULL,
  "exitPrice" DOUBLE PRECISION,
  "quantity" DOUBLE PRECISION NOT NULL,
  "strikePrice" DOUBLE PRECISION,
  "expiryDate" TIMESTAMP(3),
  "optionType" TEXT,
  "premium" DOUBLE PRECISION,
  "entryDate" TIMESTAMP(3) NOT NULL,
  "exitDate" TIMESTAMP(3),
  "profitLoss" DOUBLE PRECISION,
  "notes" TEXT,
  "sector" TEXT,
  "strategy" TEXT,
  "setupImageUrl" TEXT,
  "preTradeEmotion" TEXT,
  "postTradeEmotion" TEXT,
  "tradeConfidence" INTEGER,
  "tradeRating" INTEGER,
  "lessons" TEXT,
  "riskRewardRatio" DOUBLE PRECISION,
  "stopLoss" DOUBLE PRECISION,
  "targetPrice" DOUBLE PRECISION,
  "timeFrame" TEXT,
  "marketCondition" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,

  CONSTRAINT "Trade_pkey" PRIMARY KEY ("id")
); 