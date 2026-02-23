import { neon } from "@neondatabase/serverless";

function getDb() {
    const databaseUrl = process.env.DATABASE_URL;
    if (!databaseUrl) {
        throw new Error("DATABASE_URL environment variable is not set");
    }
    return neon(databaseUrl);
}

export interface TrainingConfig {
    id: number;
    core_identity: string;
    strategic_positioning: string;
    frameworks: string;
    case_examples: string;
    tone_adjustments: string;
    updated_at: string;
}

export async function getTrainingConfig(): Promise<TrainingConfig> {
    const sql = getDb();
    const rows = await sql`SELECT * FROM ai_training_config ORDER BY id LIMIT 1`;
    if (rows.length === 0) {
        throw new Error("No training config found in database");
    }
    return rows[0] as TrainingConfig;
}

export async function updateTrainingConfig(
    field: keyof Omit<TrainingConfig, "id" | "updated_at">,
    value: string
): Promise<void> {
    const sql = getDb();
    switch (field) {
        case "core_identity":
            await sql`UPDATE ai_training_config SET core_identity = ${value}, updated_at = NOW() WHERE id = (SELECT id FROM ai_training_config ORDER BY id LIMIT 1)`;
            break;
        case "strategic_positioning":
            await sql`UPDATE ai_training_config SET strategic_positioning = ${value}, updated_at = NOW() WHERE id = (SELECT id FROM ai_training_config ORDER BY id LIMIT 1)`;
            break;
        case "frameworks":
            await sql`UPDATE ai_training_config SET frameworks = ${value}, updated_at = NOW() WHERE id = (SELECT id FROM ai_training_config ORDER BY id LIMIT 1)`;
            break;
        case "case_examples":
            await sql`UPDATE ai_training_config SET case_examples = ${value}, updated_at = NOW() WHERE id = (SELECT id FROM ai_training_config ORDER BY id LIMIT 1)`;
            break;
        case "tone_adjustments":
            await sql`UPDATE ai_training_config SET tone_adjustments = ${value}, updated_at = NOW() WHERE id = (SELECT id FROM ai_training_config ORDER BY id LIMIT 1)`;
            break;
        default:
            throw new Error(`Invalid field: ${field}`);
    }
}

export async function initializeDatabase(): Promise<void> {
    const sql = getDb();
    await sql`
    CREATE TABLE IF NOT EXISTS ai_training_config (
      id SERIAL PRIMARY KEY,
      core_identity TEXT NOT NULL DEFAULT '',
      strategic_positioning TEXT NOT NULL DEFAULT '',
      frameworks TEXT NOT NULL DEFAULT '',
      case_examples TEXT NOT NULL DEFAULT '',
      tone_adjustments TEXT NOT NULL DEFAULT '',
      updated_at TIMESTAMP DEFAULT NOW()
    )
  `;
    // Insert default row if none exists
    const rows = await sql`SELECT id FROM ai_training_config LIMIT 1`;
    if (rows.length === 0) {
        await sql`
      INSERT INTO ai_training_config (core_identity, strategic_positioning, frameworks, case_examples, tone_adjustments)
      VALUES (
        'You are the AI Consulting Assistant of Ramjit Ray — a strategic architect with 25+ years of experience building, repositioning, and scaling India''s most consequential brands. You represent Matrix Integrated, an institution across four integrated divisions: brand management, experiential events, loyalty ecosystems, and AI-driven digital strategy.',
        'Ramjit Ray is not a consultant. He is a strategic co-pilot for CXOs and Promoters navigating high-stakes business transformations. His work spans Tata Steel (8 brands from inception), ITC Personal Care, Pepsi India, Lafarge India, Aditya Birla Group, Taj Hotels, Governments of West Bengal and Odisha, and UNICEF. He launched India''s first mobile service (Hutch) and pioneered India''s first free internet service.',
        'THE MATRIX GRID:
Node 1 — Intelligence: AI and deeptech as business architecture decisions, not technology initiatives.
Node 2 — Implementation: Turning GTM frameworks into revenue-generating realities with measurable exit conditions.
Node 3 — Transformation: Repositioning heritage brands for modern consumer behaviour.

DIAGNOSTIC FRAMEWORK: Always diagnose before prescribing. Identify the systemic root cause, not the surface symptom. A branding failure is often a manufacturing bottleneck. A GTM collapse is almost always an operational friction point.',
        'Pepsi India — Amader Choice: Turned Durga Puja into a city-wide brand event through public voting mechanism. Result: mass organic participation and brand association lasting years.
Hutch India: Built both operational infrastructure and market demand simultaneously for India''s first mobile service.
ITC Vivel: Campus Experience Bus touring colleges across cities for Vivel Facewash launch.
Tata Steel: 12 simultaneous award-winning loyalty programs including Tata Tiscon Parivaar and Tata Shaktee Star Club.
Tata Steel x UNICEF: Arsenic awareness campaign across Murshidabad covering panchayats, schools, and health centres.
International Events: Board-level experiences across 20+ countries for Tata Steel.',
        'Tone: Authoritative, strategic, direct. Never generic. Never fluffy. Speak like a seasoned strategist who has seen it all and cuts through noise instantly. Use frameworks, not opinions. Challenge weak thinking constructively. Be respectful but never deferential to bad strategy.'
      )
    `;
    }
}
