import { NextResponse } from "next/server";

const PROMPT = `You are generating bagel names for "Unbearable Bagels", a Brisbane cafe whose bagels are named after mildly unbearable, annoying, or undesirable things — especially things specific to Brisbane and Queensland life.

The names are short, punchy, all-caps, and capture a universal Brisbane frustration. The taglines are dry and deadpan — one or two short sentences that land the joke.

Examples of the style:
- MAGIC ROUND: "NRL week. Every tourist in Brisbane, drunk, in your way, for five days."
- BIN CHICKEN: "He was already at your table when you got back from the counter."
- HOT STEERING WHEEL: "February, 3pm. The car's been in full sun. You have no gloves. You have no choice."
- TRANSLINK DELAY: "The app said three minutes. That was twenty-two minutes ago."
- GABBA DEMO: "Demolishing a beloved stadium for the Olympics. Nobody asked."
- SCHOOL DROP-OFF: "There is a zone. Nobody understands the zone. The zone is chaos."
- CROSS RIVER RAIL: "Coming soon. Has been for a decade. Still a bus replacement."
- VALLEY FRIDAY: "11pm. Someone's glitter is now your problem."
- NEW FARM PARKING: "You drove past the same spot four times. Someone else got it."
- WET SEASON: "November through April. Perpetually damp. Mould on the bathroom ceiling again."

Generate ONE brand new bagel name not on this list. It must be:
- Named after something genuinely unbearable, annoying, or undesirable
- Specific to Brisbane / Queensland / Australian life where possible
- 1-4 words, ALL CAPS
- The tagline must be dry, deadpan, and funny — 1-2 short punchy sentences max
- The fillings should be real bagel ingredients that loosely match the vibe

Respond with ONLY valid JSON, no markdown code blocks:
{"name":"THE NAME","tagline":"Deadpan description of why it's unbearable.","fillings":"ingredient one, ingredient two, ingredient three, bagel type"}`;

export async function POST() {
  const apiKey =
    process.env.Anhropic ??
    process.env.Anthropic ??
    process.env.ANTHROPIC_API_KEY ??
    process.env.ANTHROPIC_KEY;

  if (!apiKey) {
    const found = Object.keys(process.env).filter((k) =>
      k.toLowerCase().includes("anthrop")
    );
    return NextResponse.json(
      {
        error: "API key not found",
        hint: found.length
          ? `Found these matching vars: ${found.join(", ")} — update the route to use the correct name`
          : "No env var containing 'anthrop' found — check Vercel → Settings → Environment Variables",
      },
      { status: 500 }
    );
  }

  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 300,
        messages: [{ role: "user", content: PROMPT }],
      }),
    });

    if (!res.ok) {
      const body = await res.text();
      return NextResponse.json(
        { error: `Anthropic API returned ${res.status}: ${body}` },
        { status: 500 }
      );
    }

    const data = await res.json();
    const raw: string = data.content[0].text;
    const cleaned = raw.replace(/```json\n?|\n?```/g, "").trim();
    const bagel = JSON.parse(cleaned);

    return NextResponse.json(bagel);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
