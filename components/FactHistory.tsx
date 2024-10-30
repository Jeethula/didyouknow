"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

interface FactHistoryProps {
  history: Array<{ text: string; timestamp: string }>;
}

export function FactHistory({ history }: FactHistoryProps) {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
    >
      <Card className="p-6 backdrop-blur-sm bg-card/80">
        <h2 className="text-2xl font-bold mb-4">Previous Facts</h2>
        <div className="space-y-4">
          {history.map((item, index) => (
            <div key={index} className="p-4 rounded-lg bg-accent/10">
              <p>{item.text}</p>
              <small className="text-muted-foreground">
                {new Date(item.timestamp).toLocaleString()}
              </small>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}