"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RefreshCw, ExternalLink } from "lucide-react";
import Image from "next/image";

interface ElonNewsProps {
  news: {
    source: string;
    title: string;
    description: string;
    url?: string;
    urlImage?: string;
    publishDate?: string;
  } | null;
  loading: boolean;
  onRefresh: () => void;
}

export function ElonNews({ news, loading, onRefresh }: ElonNewsProps) {
  if (!news) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="mx-auto w-full"
    >
      <Card className="border-2 border-accent/20 bg-card/80 backdrop-blur-sm p-6">
        <div className="space-y-4">
          {news.urlImage && (
            <div className="relative rounded-lg w-full overflow-hidden aspect-video">
              <Image
                src={news.urlImage}
                alt={news.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 800px"
                priority
              />
            </div>
          )}
          <h3 className="font-bold text-2xl">{news.title}</h3>
          <p className="text-muted-foreground">{news.description}</p>
          <div className="flex flex-col space-y-2">
            <p className="text-accent-foreground text-sm">Source: {news.source}</p>
            {news.publishDate && (
              <p className="text-accent-foreground text-sm">
                Published: {new Date(news.publishDate).toLocaleDateString()}
              </p>
            )}
          </div>
          <div className="flex flex-wrap gap-4">
            {/* <Button
              onClick={onRefresh}
              disabled={loading}
              className="flex-1 bg-gradient-to-r from-blue-600 hover:from-blue-700 to-purple-600 hover:to-purple-700 w-full sm:w-auto"
            >
              <RefreshCw className={`mr-2 w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              Get Latest Elon News
            </Button> */}
            {news.url && (
              <Button
                variant="outline"
                className="flex-1 w-full sm:w-auto"
                onClick={() => window.open(news.url, '_blank')}
              >
                <ExternalLink className="mr-2 w-4 h-4" />
                Read Full Article
              </Button>
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  );
}