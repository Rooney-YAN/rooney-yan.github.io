---
title: My First Quant Hackathon: What I Learned
slug: first-quant-hackathon
date: 2026-10-22
category: Think
tags: Quant, APAC Quant Trading Hackathon, AI, Trading
language: en
excerpt: We went from negative returns to near the top of the leaderboard, then finished seventh in Hong Kong. It made me look harder at backtests, long exposure, and my own judgment.
---

*Originally written in Chinese.*

When our returns were near their peak, we discussed whether to close our positions. We had climbed as high as second or third on the leaderboard, after starting the competition in the red only days earlier. In the end, we let the strategy keep running and stayed heavily long. Then the broader market fell, our gains shrank, and we finished seventh in Hong Kong.

This was my first APAC Quant Trading Hackathon. Over those ten-odd days, my opinion of my own ability changed almost as often as the number on our account. Looking back, the result is less interesting than this: we knew our strategy favored long positions, but we had never decided what to do if the market turned down.

## 01. A good-looking backtest deserves a second look

Before the competition, my understanding of quant trading was mostly a collection of concepts I had heard about. Once I had to find factors, run backtests, and deploy a trading bot myself, I realized how much I didn't know. AI helped me learn quickly and write code, but getting a bot to run and getting it to make money turned out to be very different things.

One teammate had a method I jokingly called the “factor-mining technique”: try many factors and parameter combinations, then inspect the best backtests. We found a few with startling returns. My first reaction to those curves was, “Is making money with quant really this easy?” Once I calmed down, the problem was obvious: the more combinations you try, the more likely you are to find a few that happen to fit the period you tested. A beautiful curve does not make **multiple testing and overfitting** go away.

We also found **survivorship bias** in the assets used for our backtests. Crypto has been through several rounds of shakeouts. If you backtest the past using only assets that still trade today, the ones that were delisted disappear from the sample. The surviving assets have already passed through a filter, which can make historical performance look better than it really was. This is a separate problem from trying many factors and showing only the winners. We had to reckon with both.

After experimenting, we chose a momentum factor as our main signal. It used the direction and strength of price changes over a period of time to gauge momentum. In our backtests it worked reasonably well on the long side, but had almost no alpha when used to short. We saw the difference without isolating its cause: how much of the return came from the factor itself, and how much from simply being long in a rising market? How would trading costs change the picture? At least one thing was clear: **our strategy depended heavily on conditions that favored long positions.**

## 02. From losses to the top of the leaderboard, then seventh

We were losing money early in the competition, and I felt too inexperienced for this. Then the market improved, the strategy began to earn, and we climbed to second or third. Those days felt great. I started thinking I might actually be good at this, and even caught myself looking down on other teams. My confidence arrived much faster than any solid research conclusion.

In the final days the broader market fell, and our long positions gave back much of what we had earned. While our returns were still near their peak, we seriously considered closing the positions. Part of me thought a quant strategy should be allowed to run without a human stepping in at the first sign of volatility. Another part hated watching a gain disappear. We stayed with the original strategy. You can guess what happened next.

> If exit conditions were never written into the strategy, was “sticking to it” discipline, or did we simply have no rule to follow?

I still can't say that closing the positions would definitely have been better. If prices had kept rising, we might have regretted leaving early. The real problem was that we had not agreed in advance when to reduce exposure or stop trading. We only began debating it after the market turned. The loss wasn't entirely bad luck: a strategy that had already shown such a strong long bias in backtests should have accounted for a falling market.

## 03. The report was finished; the questions weren't

Later in the competition, we realized that the repository and strategy report carried a substantial share of the score, so we revisited the project and its backtests. That made the gaps harder to ignore: our original strategy lacked adequate stop-loss rules, drawdown limits, and position sizing. We had spent more time searching for higher-return factors, leaving risk management for later. In particular, our position sizes did not reflect how dependent the strategy was on market direction.

When we extended the backtest, the factor still showed fairly clear historical excess returns. I don't want to discard it because of a few bad days at the end of the competition. But a longer backtest doesn't answer everything. What we need next is a set of comparable tests that asks:

- How much historical return remains when delisted assets are included?
- Compared with the market over the same period, how much of the long-side return came from the factor?
- What happens to returns, maximum drawdown, and trading costs when we add position limits and exit rules?

I don't have a reliable before-and-after set of numbers to publish, so I won't claim that adding a stop-loss improved our Sharpe ratio by some made-up amount. What I can say is that we built a working strategy and saw its weaknesses in a live market. Whether it has durable alpha still needs testing.

## 04. A disagreement over the repo

Communication within the team became strained while we were preparing the repository and final report. In hindsight, we should have agreed earlier on who would do what, when it was due, and what a finished report needed to contain. I had a part in it too: I had researched how to organize the repo, but relied on AI to produce a quick first draft of the report. When we reviewed it later, some important technical questions had not been examined carefully enough. Producing a draft quickly did not mean the work was done well.

I still felt wronged at the time and kept explaining what I had contributed. Later I noticed how easily I hear criticism of my work as criticism of me. That sensitivity may have something to do with the meritocratic mindset I've grown used to. Realizing it doesn't make it disappear, but next time I want to agree on the work more clearly from the start—and learn to separate “this report needs work” from “I'm not good enough.”

## 05. What AI changed, and what I want to try next

We used AI throughout the competition: to learn concepts, write and debug code, and help with the report. I doubt a hackathon today can be judged simply by who wrote more lines of code by hand. For me, the hardest part was judgment. How much should I trust a backtest? Was the long-side performance just a favorable market? When should risk rules have been defined? AI can help examine those questions, but it cannot bear the trading outcome for me.

A video about Vibe Trading caught my attention a few days ago. If AI makes it easy for more people to build trading bots, will competition quickly erode similar opportunities? I don't know yet, but I want to run a small experiment of my own: build an AI-assisted trading bot, finish the research, paper trading, and risk rules first, then run it for six months with HK$2,000. I can afford to lose that amount. If it earns money, I'll put some of the profit into model tokens and continue the research. If it fails, I'll at least organize the trades and mistakes and talk them through with people who know more than I do.

---

My first quant competition ended with seventh place in Hong Kong. I didn't find an alpha I can confidently claim, and I left with plenty of unfinished work. If my own bot has actually run for six months, I hope the next post can show returns, drawdowns, and trade records—not just another attractive backtest curve.
