"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Rocket, History } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ModeToggle } from "@/components/mode-toggle";
import { FactCard } from "@/components/FactCard";
import { FactHistory } from "@/components/FactHistory";
import { ElonNews } from "@/components/ElonNews";

interface Fact {
  text: string;
  timestamp: string;
}

interface ElonNews {
  source: string;
  title: string;
  description: string;
  url?: string;
  urlImage?: string;
  publishDate?: string;
}

export default function Home() {
  const [fact, setFact] = useState<string>("");
  const [elonNews, setElonNews] = useState<ElonNews | null>(null);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<Fact[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [showElonSection, setShowElonSection] = useState(false);

  useEffect(() => {
    const savedHistory = localStorage.getItem("factHistory");
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
    getFact();
  }, []);

  const getFact = async () => {
    setLoading(true);
    
    // Define all available endpoints
    const endpoints = [
      {
        url: "https://uselessfacts.jsph.pl/api/v2/facts/random",
        type: "useless",
      },
      {
        url: "https://numbersapi.p.rapidapi.com/random/trivia?min=10&max=20",
        type: "numbers",
      },
      {
        url: `https://numbersapi.p.rapidapi.com/${Math.floor(Math.random() * 10)}/${Math.floor(Math.random() * 31)}/date`,
        type: "numbers",
      },
      {
        url: `https://numbersapi.p.rapidapi.com/${Math.floor(Math.random() * 1000)}/math`,
        type: "numbers",
      },
      {
        url: `https://numbersapi.p.rapidapi.com/${Math.floor(Math.random() * 10)}/trivia?notfound=floor`,
        type: "numbers",
      },
      {
        url: `https://numbersapi.p.rapidapi.com/${Math.floor(Math.random() * 1000)}/year`,
        type: "numbers",
      }
    ];

    // Shuffle endpoints array
    const shuffledEndpoints = [...endpoints].sort(() => Math.random() - 0.5);

    // Try endpoints in random order until one succeeds
    for (const endpoint of shuffledEndpoints) {
      try {
        const options = endpoint.type === "numbers" ? {
          headers: {
            'x-rapidapi-key': process.env.API_KEY || '',
            'x-rapidapi-host': 'numbersapi.p.rapidapi.com'
          }
        } : {};

        const res = await fetch(endpoint.url, options);
        if (!res.ok) throw new Error('Response not OK');

        const data = endpoint.type === "useless" 
          ? await res.json()
          : { text: await res.text() };

        const factText = endpoint.type === "useless" ? data.text : data.text;
        setFact(factText);
        
        const newHistory = [
          { text: factText, timestamp: new Date().toISOString() }, 
          ...history
        ].slice(0, 10);
        
        setHistory(newHistory);
        localStorage.setItem("factHistory", JSON.stringify(newHistory));
        break; // Exit loop on success
      } catch (error) {
        console.error(`Error fetching from ${endpoint.url}:`, error);
        continue; // Try next endpoint
      }
    }

    setLoading(false);
  };

  const getElonNews = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/elon-news");
      const data = await res.json();
      
      if (data.error) {
        throw new Error(data.error);
      }

      setElonNews({
        source: data.source,
        title: data.title,
        description: data.description,
        url: data.url,
        urlImage: data.urlImage,
        publishDate: data.publishDate
      });
    } catch (error) {
      console.error("Error fetching Elon news:", error);
      setElonNews({
        source: "Error",
        title: "Failed to load news",
        description: "Please try again later."
      });
    }
    setLoading(false);
  };

  return (
    <div className="bg-gradient-to-br from-background via-background to-accent">
      <div className="mx-auto px-4 py-8 max-w-4xl container">
        <div className="flex justify-between items-center mb-8">
          <h1 className="bg-clip-text bg-gradient-to-r from-primary to-accent font-bold text-4xl text-transparent">
            Did You Know?
          </h1>
          <ModeToggle />
        </div>

        <div className="gap-8 grid">
          <AnimatePresence mode="wait">
            <FactCard
              fact={fact}
              loading={loading}
              onRefresh={getFact}
            />
          </AnimatePresence>

          <Button
            variant="outline"
            onClick={() => setShowHistory(!showHistory)}
            className="hover:scale-105 transition-all"
          >
            <History className="mr-2 w-4 h-4" />
            {showHistory ? "Hide History" : "Show History"}
          </Button>

          {showHistory && <FactHistory history={history} />}

          <motion.div whileHover={{ scale: 1.02 }} className="w-full">
            <Button
              onClick={() => {
                setShowElonSection(!showElonSection);
                if (!elonNews) getElonNews();
              }}
              className="bg-gradient-to-r from-blue-600 hover:from-blue-700 to-purple-600 hover:to-purple-700 w-full"
            >
              <Rocket className="mr-2 w-4 h-4" />
              Elon Musk Zone
            </Button>
          </motion.div>

          {showElonSection && (
            <ElonNews
              news={elonNews}
              loading={loading}
              onRefresh={getElonNews}
            />
          )}
        </div>
      </div>
    </div>
  );
}