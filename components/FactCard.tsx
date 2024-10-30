"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Share2, RefreshCw } from "lucide-react";

interface FactCardProps {
  fact: string;
  loading: boolean;
  onRefresh: () => void;
}

export function FactCard({ fact, loading, onRefresh }: FactCardProps) {
  return (
    <motion.div
      key={fact}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="gradient-border-box"
    >
      <div className="p-8 backdrop-blur-sm bg-card/95 rounded-2xl">
        <p className="text-xl mb-6 leading-relaxed">{fact || "Loading..."}</p>
        <div className="flex flex-wrap gap-4">
          <Button
            onClick={onRefresh}
            disabled={loading}
            className="group hover:scale-105 transition-all bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
          >
            <RefreshCw className="mr-2 h-4 w-4 group-hover:rotate-180 transition-transform duration-500" />
            New Fact
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              if (fact) {
                navigator.share?.({ text: fact }).catch(() => {
                  navigator.clipboard.writeText(fact);
                });
              }
            }}
            className="hover:scale-105 transition-all border-2"
          >
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
        </div>
      </div>
    </motion.div>
  );
}