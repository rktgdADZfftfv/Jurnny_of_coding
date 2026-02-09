import { useState, useEffect } from "react";

function AutoBlogger() {
  const [logs, setLogs] = useState([]);
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [userLang, setUserLang] = useState("en"); // default English

  // Helper: Logs dikhane ke liye
  const addLog = (message) => setLogs((prev) => [...prev, message]);

  // --- Detect User Language via IP ---
  useEffect(() => {
    const detectLanguage = async () => {
      try {
        const response = await fetch("https://ipapi.co/json/");
        const data = await response.json();
        const countryCode = data.country_code;

        // Simple mapping (expand as needed)
        const languageMap = {
          IN: "hi", // Hindi
          FR: "fr", // French
          JP: "ja", // Japanese
          US: "en", // English
        };

        setUserLang(languageMap[countryCode] || "en");
      } catch (err) {
        console.error("Language detection failed:", err);
        setUserLang("en");
      }
    };
    detectLanguage();
  }, []);

  // --- 1. SPY ROBOT (NewsAPI - Random Edition) ---
  const fetchNews = async () => {
    setIsLoading(true);
    addLog("🕵️ Spy Robot: Searching for fresh news...");

    const NEWS_API_KEY = import.meta.env.VITE_NEWS_API_KEY;
    const url = `https://newsapi.org/v2/everything?q=tesla&from=2026-01-09&sortBy=publishedAt&apiKey=${NEWS_API_KEY}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (!data.articles || data.articles.length === 0) {
        addLog("⚠️ No news found, switching to backup...");
        generateArticle("Future of AI", "AI is changing the world rapidly.");
        return;
      }

      const randomIndex = Math.floor(Math.random() * data.articles.length);
      const randomNews = data.articles[randomIndex];
      addLog(`🕵️ News Found: "${randomNews.title}"`);

      generateArticle(
        randomNews.title,
        randomNews.description || randomNews.title,
        randomNews.urlToImage
      );
    } catch (error) {
      addLog("❌ Spy Error: " + error.message);
      setIsLoading(false);
    }
  };

  // --- 2. CREATOR ROBOT (Groq AI + Unsplash fallback) ---
  const generateArticle = async (title, description, imageUrl) => {
    addLog("🤖 Groq AI: Writing in English... ⚡");

    const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;
    const url = "https://api.groq.com/openai/v1/chat/completions";
    const requestBody = {
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "system",
          content:
            "You are a tech blogger. Always write in English only. Do not use other languages. Write a short, engaging blog post (max 100 words) with emojis. Do not use ** symbols or markdown formatting."
        },
        {
          role: "user",
          content: `Topic: ${title}. \nDetails: ${description}`
        }
      ]
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${GROQ_API_KEY}`
        },
        body: JSON.stringify(requestBody)
      });
      const data = await response.json();
      if (data.error) throw new Error(data.error.message);

      const aiContent = data.choices[0].message.content;

      // Agar image missing hai to Unsplash open endpoint use karo
      const finalImage =
        imageUrl ||
        `https://source.unsplash.com/800x400/?${encodeURIComponent(title)}`;

      // Translate title based on userLang (using browser's built-in Intl API for demo)
      const translatedTitle =
        userLang === "en"
          ? title
          : new Intl.DisplayNames([userLang], { type: "language" })
              ? title // Placeholder: ideally use translation API
              : title;

      addLog("✅ Article Published!");
      const newPost = {
        id: Date.now(),
        title: translatedTitle,
        content: aiContent,
        image: finalImage
      };
      setArticles((prev) => [newPost, ...prev]);
    } catch (error) {
      addLog("❌ Groq Error: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="dashboard dark-mode">
      <h1 className="title">⚙️ Auto-Blogger Dashboard</h1>

      {/* --- BUTTON AREA --- */}
      <div className="button-area">
        {isLoading ? (
          <p className="loading">⏳ Robots are working...</p>
        ) : (
          <button onClick={fetchNews} className="start-btn">
            🚀 Start Automation
          </button>
        )}
      </div>

      {/* --- LOGS --- */}
      <div className="logs">
        {logs.length === 0 ? (
          <div>System Ready... Waiting for command.</div>
        ) : (
          logs.map((log, i) => <div key={i}>&gt; {log}</div>)
        )}
      </div>

      {/* --- ARTICLES --- */}
      <div className="articles">
        <h2>📝 Live Articles</h2>
        {articles.length === 0 && (
          <p className="empty">No articles yet.</p>
        )}
        {articles.map((post) => (
          <div key={post.id} className="card">
            <img src={post.image} alt="Tech" className="card-img" />
            <h2 className="card-title">{post.title}</h2>
            <div className="card-content">{post.content}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AutoBlogger;
