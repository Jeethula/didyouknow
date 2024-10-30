"use client";

import { motion } from "framer-motion";
import { Heart, Github, Twitter, Linkedin } from "lucide-react";
import { Button } from "./ui/button";

export function Footer() {
  return (
    <motion.footer 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="border-accent/20 mt-12 py-6 border-t w-full"
    >
      <div className="mx-auto px-4 max-w-4xl container">
        <div className="flex md:flex-row flex-col justify-center md:justify-between items-center gap-4">
          <div className="flex items-center space-x-1 text-muted-foreground text-sm">
            <span>Built with</span>
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            >
              <Heart className="w-4 h-4 text-red-500" />
            </motion.div>
            <span>by</span>
            <a
              href="https://jeethu.me"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium hover:underline"
            >
              Jeethu
            </a>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              className="hover:scale-110 transition-transform"
              asChild
            >
              <a
                href="https://github.com/jeethula"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="hover:scale-110 transition-transform"
              asChild
            >
              <a
                href="https://linkedin.com/in/jeethula"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </motion.footer>
  );
} 