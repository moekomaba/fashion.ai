import { useState, useRef, useCallback } from 'react';
import {
  Camera,
  Link,
  Sparkles,
  ExternalLink,
  Trash2,
  Plus,
  X,
  Tag,
  DollarSign,
  Star,
  MessageCircle,
  Search,
} from 'lucide-react';

const GREEN = {
  dark: '#2D6A4F',
  mid: '#40916C',
  light: '#D8F3DC',
  text: '#1B4332',
  accent: '#52B788',
};

function LoadingBar({ step, total }) {
  return (
    <div style={{ display: 'flex', gap: 6, justifyContent: 'center' }}>
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          style={{
            height: 4,
            flex: 1,
            maxWidth: 48,
            borderRadius: 99,
            background: i <= step ? GREEN.dark : GREEN.light,
            transition: 'background 0.4s',
          }}
        />
      ))}
    </div>
  );
}

function AnalysisCard({ result, onClose }) {
  return (
    <div
      style={{
        background: '#fff',
        borderRadius: 20,
        boxShadow: '0 8px 32px rgba(45,106,79,0.13)',
        overflow: 'hidden',
        marginTop: 16,
        animation: 'fadeUp 0.35s ease',
      }}
    >
      <div
        style={{
          background: `linear-gradient(135deg, ${GREEN.dark}, ${GREEN.mid})`,
          padding: '16px 20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <span style={{ color: '#fff', fontWeight: 700, fontSize: 15 }}>
          AI 解析結果
        </span>
        <button
          onClick={onClose}
          style={{
            background: 'rgba(255,255,255,0.2)',
            border: 'none',
            borderRadius: '50%',
            width: 28,
            height: 28,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <X size={14} color="#fff" />
        </button>
      </div>
      <div
        style={{
          padding: 20,
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
        }}
      >
        <div style={{ display: 'flex', gap: 12 }}>
          <div
            style={{
              flex: 1,
              background: GREEN.light,
              borderRadius: 14,
              padding: '12px 16px',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                marginBottom: 4,
              }}
            >
              <Tag size={13} color={GREEN.dark} />
              <span
                style={{
                  fontSize: 11,
                  color: GREEN.text,
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: 0.8,
                }}
              >
                ブランド
              </span>
            </div>
            <p
              style={{
                margin: 0,
                fontWeight: 700,
                fontSize: 14,
                color: GREEN.text,
              }}
            >
              {result.brand}
            </p>
          </div>
          <div
            style={{
              flex: 1,
              background: '#FFF8F0',
              borderRadius: 14,
              padding: '12px 16px',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                marginBottom: 4,
              }}
            >
              <DollarSign size={13} color="#B45309" />
              <span
                style={{
                  fontSize: 11,
                  color: '#92400E',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: 0.8,
                }}
              >
                推定価格
              </span>
            </div>
            <p
              style={{
                margin: 0,
                fontWeight: 700,
                fontSize: 14,
                color: '#92400E',
              }}
            >
              {result.price}
            </p>
          </div>
        </div>
        <div
          style={{
            background: '#F8F8F8',
            borderRadius: 14,
            padding: '12px 16px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              marginBottom: 6,
            }}
          >
            <Star size={13} color="#7C3AED" />
            <span
              style={{
                fontSize: 11,
                color: '#5B21B6',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: 0.8,
              }}
            >
              スタイルポイント
            </span>
          </div>
          <p
            style={{
              margin: 0,
              fontSize: 13.5,
              color: '#374151',
              lineHeight: 1.7,
            }}
          >
            {result.style}
          </p>
        </div>
        {result.scenes && result.scenes.length > 0 && (
          <div
            style={{
              background: '#EEF2FF',
              borderRadius: 14,
              padding: '12px 16px',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                marginBottom: 10,
              }}
            >
              <Star size={13} color="#4338CA" />
              <span
                style={{
                  fontSize: 11,
                  color: '#3730A3',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: 0.8,
                }}
              >
                こんな場面で使える
              </span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {result.scenes.map((s, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    background: '#fff',
                    borderRadius: 10,
                    padding: '9px 12px',
                    border: '1px solid #E0E7FF',
                  }}
                >
                  <span
                    style={{
                      fontSize: 13,
                      color: '#4F46E5',
                      fontWeight: 700,
                      minWidth: 20,
                    }}
                  >
                    {i + 1}.
                  </span>
                  <span style={{ fontSize: 13, color: '#374151' }}>{s}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function SceneCard({ item, idx }) {
  return (
    <div
      style={{
        background: '#fff',
        borderRadius: 18,
        boxShadow: '0 4px 16px rgba(45,106,79,0.09)',
        overflow: 'hidden',
        animation: `fadeUp 0.3s ease ${idx * 0.07}s both`,
      }}
    >
      <div
        style={{
          background: `linear-gradient(135deg, ${GREEN.dark}, ${GREEN.mid})`,
          padding: '10px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
        }}
      >
        <span
          style={{
            background: 'rgba(255,255,255,0.25)',
            color: '#fff',
            fontSize: 12,
            fontWeight: 700,
            borderRadius: 99,
            padding: '2px 9px',
          }}
        >
          提案 {idx + 1}
        </span>
        <span style={{ color: '#fff', fontWeight: 700, fontSize: 14, flex: 1 }}>
          {item.title}
        </span>
      </div>
      <div
        style={{
          padding: '14px 16px',
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
        }}
      >
        <div style={{ display: 'flex', gap: 10 }}>
          <div
            style={{
              flex: 1,
              background: GREEN.light,
              borderRadius: 12,
              padding: '10px 12px',
            }}
          >
            <p
              style={{
                margin: '0 0 2px',
                fontSize: 10,
                color: GREEN.text,
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: 0.7,
              }}
            >
              アイテム
            </p>
            <p
              style={{
                margin: 0,
                fontSize: 13,
                color: GREEN.text,
                fontWeight: 600,
              }}
            >
              {item.items}
            </p>
          </div>
          <div
            style={{
              flex: 1,
              background: '#FFF8F0',
              borderRadius: 12,
              padding: '10px 12px',
            }}
          >
            <p
              style={{
                margin: '0 0 2px',
                fontSize: 10,
                color: '#92400E',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: 0.7,
              }}
            >
              予算感
            </p>
            <p
              style={{
                margin: 0,
                fontSize: 13,
                color: '#92400E',
                fontWeight: 600,
              }}
            >
              {item.budget}
            </p>
          </div>
        </div>
        <div
          style={{
            background: '#F8F8F8',
            borderRadius: 12,
            padding: '10px 12px',
          }}
        >
          <p
            style={{
              margin: '0 0 4px',
              fontSize: 10,
              color: '#5B21B6',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: 0.7,
            }}
          >
            ポイント
          </p>
          <p
            style={{
              margin: 0,
              fontSize: 13,
              color: '#374151',
              lineHeight: 1.7,
            }}
          >
            {item.point}
          </p>
        </div>
        {item.searchUrl && (
          <a
            href={item.searchUrl}
            target="_blank"
            rel="noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6,
              background: GREEN.light,
              borderRadius: 12,
              padding: '10px',
              textDecoration: 'none',
              border: `1px solid ${GREEN.accent}`,
            }}
          >
            <Search size={14} color={GREEN.dark} />
            <span style={{ fontSize: 13, color: GREEN.dark, fontWeight: 600 }}>
              ZOZOTOWNで探す
            </span>
            <ExternalLink size={12} color={GREEN.mid} />
          </a>
        )}
      </div>
    </div>
  );
}

function compressImage(base64, maxSize = 800) {
  return new Promise((res) => {
    const img = new Image();
    img.onload = () => {
      const scale = Math.min(1, maxSize / Math.max(img.width, img.height));
      const w = Math.round(img.width * scale),
        h = Math.round(img.height * scale);
      const c = document.createElement('canvas');
      c.width = w;
      c.height = h;
      c.getContext('2d').drawImage(img, 0, 0, w, h);
      res(c.toDataURL('image/jpeg', 0.82).split(',')[1]);
    };
    img.src = 'data:image/jpeg;base64,' + base64;
  });
}

async function callClaudeAPI(messages, systemPrompt) {
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1000,
      system: systemPrompt,
      messages,
    }),
  });
  const data = await res.json();
  const text = data.content?.map((b) => b.text || '').join('') || '';
  return JSON.parse(text.replace(/```json|```/g, '').trim());
}

const IMAGE_SYSTEM = `あなたは世界中のファッションブランドに精通したプロのスタイリストです。画像の服・アイテムを詳しく観察し、以下のJSON形式のみで回答してください。余分な文章・マークダウン・コードブロックは含めないでください。

ブランド特定のルール：
- ロゴ・タグ・ボタン・ステッチ・シルエット・素材感・縫製・デザインの細部から総合的に判断すること
- 日本ブランド（ZARA、ユニクロ、GU、UNIQLO、無印、BEAMS、SHIPS、UNITED ARROWS、Drawer、ENFOLD、Mame Kurogouchi、TOGA、sacai、Yohji Yamamoto、ISSEY MIYAKE、COMOLI、nanamica等）と海外ブランド（Zara、H&M、COS、& Other Stories、Arket、Mango、ASOS、Reformation、Toteme、Sandro、Maje、A.P.C.、Isabel Marant、Acne Studios、MaxMara、Theory、Club Monaco、Banana Republic、J.Crew等）どちらも積極的に候補を挙げること
- 「不明」とは絶対に回答しないこと。特定できない場合も「〜系のブランドと推定（例：COS / Arket 等）」のように必ず具体的なブランド名を含めて答えること
- 確信度が低い場合は「〜に類似（推定）」と添えること

{"brand":"ブランド名（確信度が低い場合は「〜に類似（推定）」と添える）","price":"推定価格帯（例：¥5,000〜¥15,000）","style":"素材・シルエット・色・デザインの特徴を含めて2〜3文で","scenes":["シーン1（〜に）","シーン2（〜の時に）","シーン3（〜に）"]}`;

const SCENE_SYSTEM = `あなたはファッションスタイリストです。ユーザーが入力したシーンや場面に合わせて、具体的な服装を3つ提案してください。以下のJSON形式のみで回答してください。余分な文章・マークダウン・コードブロックは含めないでください：
{"proposals":[{"title":"コーデ名（例：きれいめカジュアル）","items":"具体的なアイテム（例：白ブラウス＋ハイウエストパンツ）","budget":"予算感（例：¥10,000〜¥20,000）","point":"このコーデのポイントを1〜2文で","searchUrl":"https://zozo.jp/search/?m_str=アイテム名をここに入れてください"},{"title":"...","items":"...","budget":"...","point":"...","searchUrl":"https://zozo.jp/search/?m_str=..."},{"title":"...","items":"...","budget":"...","point":"...","searchUrl":"https://zozo.jp/search/?m_str=..."}]}`;

export default function App() {
  const [tab, setTab] = useState('image');

  // image tab
  const [image, setImage] = useState(null);
  const [imageData, setImageData] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [result, setResult] = useState(null);
  const [imgError, setImgError] = useState(null);
  const fileRef = useRef();

  // url tab
  const [url, setUrl] = useState('');
  const [editLabel, setEditLabel] = useState('');
  const [bookmarks, setBookmarks] = useState([
    { id: 1, url: 'https://www.instagram.com/', label: '淡ピンクのワンピース' },
    {
      id: 2,
      url: 'https://www.instagram.com/',
      label: 'グリーンのリネンシャツ',
    },
  ]);

  // scene tab
  const [sceneInput, setSceneInput] = useState('');
  const [sceneLoading, setSceneLoading] = useState(false);
  const [sceneStep, setSceneStep] = useState(0);
  const [proposals, setProposals] = useState(null);
  const [sceneError, setSceneError] = useState(null);

  const imgSteps = [
    '画像を読み込み中...',
    'AIが服を認識中...',
    'ブランド・価格を解析中...',
    'スタイルをまとめています...',
  ];
  const sceneSteps = [
    'シーンを解析中...',
    'スタイルを考案中...',
    'コーデをまとめています...',
  ];

  const handleImage = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setImage(ev.target.result);
      setImageData(ev.target.result.split(',')[1]);
      setResult(null);
      setImgError(null);
    };
    reader.readAsDataURL(f);
  };

  const analyze = useCallback(async () => {
    if (!imageData) return;
    setAnalyzing(true);
    setLoadingStep(0);
    setResult(null);
    setImgError(null);
    const iv = setInterval(
      () => setLoadingStep((s) => Math.min(s + 1, imgSteps.length - 1)),
      1200
    );
    try {
      const compressed = await compressImage(imageData);
      const parsed = await callClaudeAPI(
        [
          {
            role: 'user',
            content: [
              {
                type: 'image',
                source: {
                  type: 'base64',
                  media_type: 'image/jpeg',
                  data: compressed,
                },
              },
              { type: 'text', text: 'この服を解析してください。' },
            ],
          },
        ],
        IMAGE_SYSTEM
      );
      clearInterval(iv);
      setResult(parsed);
    } catch {
      clearInterval(iv);
      setImgError('解析に失敗しました。もう一度お試しください。');
    } finally {
      setAnalyzing(false);
    }
  }, [imageData]);

  const askScene = useCallback(async () => {
    if (!sceneInput.trim()) return;
    setSceneLoading(true);
    setSceneStep(0);
    setProposals(null);
    setSceneError(null);
    const iv = setInterval(
      () => setSceneStep((s) => Math.min(s + 1, sceneSteps.length - 1)),
      1400
    );
    try {
      const parsed = await callClaudeAPI(
        [
          {
            role: 'user',
            content: `このシーンに合う服装を提案してください：「${sceneInput}」`,
          },
        ],
        SCENE_SYSTEM
      );
      clearInterval(iv);
      setProposals(parsed.proposals);
    } catch {
      clearInterval(iv);
      setSceneError('提案の取得に失敗しました。もう一度お試しください。');
    } finally {
      setSceneLoading(false);
    }
  }, [sceneInput]);

  const saveUrl = () => {
    if (!url.trim()) return;
    setBookmarks((p) => [
      ...p,
      {
        id: Date.now(),
        url: url.trim(),
        label: editLabel.trim() || `お気に入り ${p.length + 1}`,
      },
    ]);
    setUrl('');
    setEditLabel('');
  };
  const removeBookmark = (id) =>
    setBookmarks((p) => p.filter((b) => b.id !== id));
  const getDomain = (u) => {
    try {
      return new URL(u).hostname.replace('www.', '');
    } catch {
      return u;
    }
  };

  const TABS = [
    { key: 'image', icon: <Camera size={15} />, label: '画像解析' },
    { key: 'url', icon: <Link size={15} />, label: 'コレクション' },
    { key: 'scene', icon: <MessageCircle size={15} />, label: 'シーン相談' },
  ];

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#F6FAF7',
        fontFamily: "'Hiragino Kaku Gothic ProN','Helvetica Neue',sans-serif",
      }}
    >
      <style>{`
        @keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
        @keyframes spin{to{transform:rotate(360deg)}}
        .tab-btn{transition:all 0.2s;}
        .act-btn:active{transform:scale(0.97);}
        .bm-card:hover{box-shadow:0 4px 16px rgba(45,106,79,0.12)!important;}
      `}</style>

      <div
        style={{
          background: `linear-gradient(135deg,${GREEN.dark} 0%,${GREEN.mid} 100%)`,
          padding: '20px 20px 28px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: -20,
            right: -20,
            width: 120,
            height: 120,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.06)',
          }}
        />
        <div style={{ position: 'relative' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 10 }}>
            <h1
              style={{
                margin: 0,
                color: '#fff',
                fontSize: 32,
                fontWeight: 800,
                fontStyle: 'italic',
                fontFamily: "Georgia, 'Times New Roman', serif",
                lineHeight: 1.1,
                letterSpacing: '-0.5px',
              }}
            >
              What's your
              <br />
              <span style={{ fontSize: 38, color: 'rgba(255,255,255,0.92)' }}>
                vibe
              </span>
              <span
                style={{
                  fontSize: 28,
                  color: 'rgba(255,255,255,0.65)',
                  fontWeight: 400,
                }}
              >
                {' '}
                for today?
              </span>
            </h1>
          </div>
        </div>
      </div>

      <div
        style={{
          background: '#fff',
          padding: '14px 16px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
        }}
      >
        <div
          style={{
            display: 'flex',
            gap: 8,
            background: '#F3F4F6',
            borderRadius: 99,
            padding: 5,
          }}
        >
          {TABS.map(({ key, icon, label }) => (
            <button
              key={key}
              className="tab-btn"
              onClick={() => setTab(key)}
              style={{
                flex: 1,
                padding: '9px 6px',
                border: 'none',
                cursor: 'pointer',
                borderRadius: 99,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 5,
                background:
                  tab === key
                    ? `linear-gradient(135deg, ${GREEN.dark}, ${GREEN.mid})`
                    : 'transparent',
                color: tab === key ? '#fff' : '#6B7280',
                fontWeight: tab === key ? 700 : 500,
                fontSize: 12.5,
                boxShadow: tab === key ? `0 2px 8px ${GREEN.dark}44` : 'none',
                transition: 'all 0.2s',
              }}
            >
              {icon}
              {label}
            </button>
          ))}
        </div>
      </div>

      <div
        style={{ padding: '20px 16px 40px', maxWidth: 480, margin: '0 auto' }}
      >
        {/* 画像解析タブ */}
        {tab === 'image' && (
          <div style={{ animation: 'fadeUp 0.3s ease' }}>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handleImage}
              style={{ display: 'none' }}
            />
            {!image ? (
              <button
                className="act-btn"
                onClick={() => fileRef.current.click()}
                style={{
                  width: '100%',
                  border: `2px dashed ${GREEN.accent}`,
                  borderRadius: 20,
                  background: GREEN.light,
                  padding: '40px 20px',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 12,
                }}
              >
                <div
                  style={{
                    background: GREEN.dark,
                    borderRadius: '50%',
                    width: 60,
                    height: 60,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Camera size={26} color="#fff" />
                </div>
                <div>
                  <p
                    style={{
                      margin: 0,
                      fontWeight: 700,
                      color: GREEN.text,
                      fontSize: 16,
                    }}
                  >
                    写真を選択 / カメラ起動
                  </p>
                  <p
                    style={{
                      margin: '4px 0 0',
                      color: GREEN.mid,
                      fontSize: 13,
                    }}
                  >
                    スクリーンショットや撮影した服の写真
                  </p>
                </div>
              </button>
            ) : (
              <div style={{ position: 'relative' }}>
                <img
                  src={image}
                  alt="uploaded"
                  style={{
                    width: '100%',
                    borderRadius: 20,
                    objectFit: 'cover',
                    maxHeight: 480,
                    boxShadow: '0 4px 20px rgba(45,106,79,0.15)',
                    display: 'block',
                    objectFit: 'contain',
                    background: '#f0f0f0',
                  }}
                />
                <button
                  onClick={() => {
                    setImage(null);
                    setResult(null);
                    setImgError(null);
                  }}
                  style={{
                    position: 'absolute',
                    top: 10,
                    right: 10,
                    background: 'rgba(0,0,0,0.55)',
                    border: 'none',
                    borderRadius: '50%',
                    width: 32,
                    height: 32,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <X size={14} color="#fff" />
                </button>
              </div>
            )}
            {image && !analyzing && !result && (
              <button
                className="act-btn"
                onClick={analyze}
                style={{
                  width: '100%',
                  marginTop: 16,
                  padding: '16px',
                  background: `linear-gradient(135deg,${GREEN.dark},${GREEN.mid})`,
                  border: 'none',
                  borderRadius: 16,
                  color: '#fff',
                  fontWeight: 700,
                  fontSize: 16,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  boxShadow: `0 6px 20px ${GREEN.dark}44`,
                }}
              >
                <Sparkles size={18} />
                AI解析スタート
              </button>
            )}
            {analyzing && (
              <div
                style={{
                  marginTop: 16,
                  background: '#fff',
                  borderRadius: 20,
                  padding: '24px 20px',
                  boxShadow: '0 4px 20px rgba(45,106,79,0.1)',
                  textAlign: 'center',
                }}
              >
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: '50%',
                    border: `3px solid ${GREEN.light}`,
                    borderTop: `3px solid ${GREEN.dark}`,
                    margin: '0 auto 16px',
                    animation: 'spin 0.9s linear infinite',
                  }}
                />
                <p
                  style={{
                    margin: '0 0 8px',
                    fontWeight: 700,
                    color: GREEN.text,
                    fontSize: 15,
                  }}
                >
                  AI 解析中...
                </p>
                <p
                  style={{ margin: '0 0 16px', color: GREEN.mid, fontSize: 13 }}
                >
                  {imgSteps[loadingStep]}
                </p>
                <LoadingBar step={loadingStep} total={imgSteps.length} />
              </div>
            )}
            {imgError && (
              <div
                style={{
                  marginTop: 16,
                  background: '#FEF2F2',
                  borderRadius: 14,
                  padding: '14px 16px',
                  color: '#B91C1C',
                  fontSize: 14,
                  textAlign: 'center',
                }}
              >
                {imgError}
              </div>
            )}
            {result && (
              <AnalysisCard result={result} onClose={() => setResult(null)} />
            )}
            {image && !analyzing && (
              <button
                className="act-btn"
                onClick={() => fileRef.current.click()}
                style={{
                  width: '100%',
                  marginTop: 12,
                  padding: '13px',
                  background: '#fff',
                  border: `1.5px solid ${GREEN.accent}`,
                  borderRadius: 14,
                  color: GREEN.dark,
                  fontWeight: 600,
                  fontSize: 14,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 6,
                }}
              >
                <Camera size={15} />
                別の写真を選ぶ
              </button>
            )}
          </div>
        )}

        {/* URL保存タブ */}
        {tab === 'url' && (
          <div style={{ animation: 'fadeUp 0.3s ease' }}>
            <div
              style={{
                background: '#fff',
                borderRadius: 20,
                padding: 20,
                boxShadow: '0 2px 12px rgba(45,106,79,0.08)',
                marginBottom: 20,
              }}
            >
              <p
                style={{
                  margin: '0 0 14px',
                  fontWeight: 700,
                  color: GREEN.text,
                  fontSize: 15,
                }}
              >
                SNS URLを保存
              </p>
              <div
                style={{ display: 'flex', flexDirection: 'column', gap: 10 }}
              >
                <input
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://www.instagram.com/p/..."
                  style={{
                    width: '100%',
                    padding: '13px 14px',
                    border: `1.5px solid ${url ? GREEN.accent : '#E5E7EB'}`,
                    borderRadius: 12,
                    fontSize: 14,
                    outline: 'none',
                    boxSizing: 'border-box',
                    background: '#FAFAFA',
                    color: '#111',
                  }}
                />
                <input
                  value={editLabel}
                  onChange={(e) => setEditLabel(e.target.value)}
                  placeholder="メモ（任意）例：白いワンピース"
                  style={{
                    width: '100%',
                    padding: '13px 14px',
                    border: '1.5px solid #E5E7EB',
                    borderRadius: 12,
                    fontSize: 14,
                    outline: 'none',
                    boxSizing: 'border-box',
                    background: '#FAFAFA',
                    color: '#111',
                  }}
                />
                <button
                  className="act-btn"
                  onClick={saveUrl}
                  disabled={!url.trim()}
                  style={{
                    padding: '14px',
                    background: url.trim()
                      ? `linear-gradient(135deg,${GREEN.dark},${GREEN.mid})`
                      : '#E5E7EB',
                    border: 'none',
                    borderRadius: 12,
                    color: url.trim() ? '#fff' : '#9CA3AF',
                    fontWeight: 700,
                    fontSize: 15,
                    cursor: url.trim() ? 'pointer' : 'not-allowed',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 6,
                  }}
                >
                  <Plus size={17} />
                  保存する
                </button>
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 12,
              }}
            >
              <p
                style={{
                  margin: 0,
                  fontWeight: 700,
                  color: GREEN.text,
                  fontSize: 15,
                }}
              >
                保存済みリスト
              </p>
              <span
                style={{
                  background: GREEN.light,
                  color: GREEN.text,
                  fontSize: 12,
                  fontWeight: 700,
                  padding: '3px 10px',
                  borderRadius: 99,
                }}
              >
                {bookmarks.length} 件
              </span>
            </div>
            {bookmarks.length === 0 ? (
              <div
                style={{
                  textAlign: 'center',
                  padding: '40px 20px',
                  color: '#9CA3AF',
                }}
              >
                <p style={{ margin: 0, fontSize: 14 }}>
                  まだ保存されていません
                </p>
              </div>
            ) : (
              <div
                style={{ display: 'flex', flexDirection: 'column', gap: 10 }}
              >
                {bookmarks.map((b, i) => (
                  <div
                    key={b.id}
                    className="bm-card"
                    style={{
                      background: '#fff',
                      borderRadius: 16,
                      padding: '14px 16px',
                      boxShadow: '0 2px 8px rgba(45,106,79,0.06)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 12,
                      animation: `fadeUp 0.25s ease ${i * 0.04}s both`,
                      border: '1px solid #F0FDF4',
                    }}
                  >
                    <div
                      style={{
                        background: GREEN.light,
                        borderRadius: 10,
                        width: 40,
                        height: 40,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <Link size={16} color={GREEN.dark} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p
                        style={{
                          margin: 0,
                          fontWeight: 600,
                          fontSize: 14,
                          color: '#111',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {b.label}
                      </p>
                      <p
                        style={{
                          margin: '2px 0 0',
                          fontSize: 12,
                          color: '#9CA3AF',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {getDomain(b.url)}
                      </p>
                    </div>
                    <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
                      <a
                        href={b.url}
                        target="_blank"
                        rel="noreferrer"
                        style={{
                          background: GREEN.light,
                          border: 'none',
                          borderRadius: 10,
                          width: 36,
                          height: 36,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          textDecoration: 'none',
                        }}
                      >
                        <ExternalLink size={15} color={GREEN.dark} />
                      </a>
                      <button
                        onClick={() => removeBookmark(b.id)}
                        style={{
                          background: '#FEF2F2',
                          border: 'none',
                          borderRadius: 10,
                          width: 36,
                          height: 36,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                        }}
                      >
                        <Trash2 size={15} color="#EF4444" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* シーン相談タブ */}
        {tab === 'scene' && (
          <div style={{ animation: 'fadeUp 0.3s ease' }}>
            <div
              style={{
                background: '#fff',
                borderRadius: 20,
                padding: 20,
                boxShadow: '0 2px 12px rgba(45,106,79,0.08)',
                marginBottom: 20,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  marginBottom: 6,
                }}
              >
                <MessageCircle size={16} color={GREEN.dark} />
                <p
                  style={{
                    margin: 0,
                    fontWeight: 700,
                    color: GREEN.text,
                    fontSize: 15,
                  }}
                >
                  どんな場面で着たい？
                </p>
              </div>
              <p style={{ margin: '0 0 14px', fontSize: 13, color: '#6B7280' }}>
                シーンや条件を自由に入力してください
              </p>
              <div
                style={{ display: 'flex', flexDirection: 'column', gap: 10 }}
              >
                <textarea
                  value={sceneInput}
                  onChange={(e) => setSceneInput(e.target.value)}
                  placeholder={
                    '例：\n・友達の結婚式の二次会に\n・ダンスの発表会の後の打ち上げに\n・初デートのランチに（カジュアルめで）'
                  }
                  rows={4}
                  style={{
                    width: '100%',
                    padding: '13px 14px',
                    border: `1.5px solid ${
                      sceneInput ? GREEN.accent : '#E5E7EB'
                    }`,
                    borderRadius: 12,
                    fontSize: 14,
                    outline: 'none',
                    boxSizing: 'border-box',
                    background: '#FAFAFA',
                    color: '#111',
                    resize: 'none',
                    lineHeight: 1.7,
                  }}
                />
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {[
                    'ダンスの練習に',
                    'パーティーに',
                    'オフィスカジュアルに',
                    'デートに',
                  ].map((s) => (
                    <button
                      key={s}
                      onClick={() => setSceneInput(s)}
                      style={{
                        padding: '6px 12px',
                        background: GREEN.light,
                        border: `1px solid ${GREEN.accent}`,
                        borderRadius: 99,
                        fontSize: 12,
                        color: GREEN.text,
                        cursor: 'pointer',
                        fontWeight: 600,
                      }}
                    >
                      {s}
                    </button>
                  ))}
                </div>
                <button
                  className="act-btn"
                  onClick={askScene}
                  disabled={!sceneInput.trim() || sceneLoading}
                  style={{
                    padding: '14px',
                    background:
                      sceneInput.trim() && !sceneLoading
                        ? `linear-gradient(135deg,${GREEN.dark},${GREEN.mid})`
                        : '#E5E7EB',
                    border: 'none',
                    borderRadius: 12,
                    color:
                      sceneInput.trim() && !sceneLoading ? '#fff' : '#9CA3AF',
                    fontWeight: 700,
                    fontSize: 15,
                    cursor:
                      sceneInput.trim() && !sceneLoading
                        ? 'pointer'
                        : 'not-allowed',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 6,
                  }}
                >
                  <Sparkles size={17} />
                  コーデを提案してもらう
                </button>
              </div>
            </div>

            {sceneLoading && (
              <div
                style={{
                  background: '#fff',
                  borderRadius: 20,
                  padding: '24px 20px',
                  boxShadow: '0 4px 20px rgba(45,106,79,0.1)',
                  textAlign: 'center',
                }}
              >
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: '50%',
                    border: `3px solid ${GREEN.light}`,
                    borderTop: `3px solid ${GREEN.dark}`,
                    margin: '0 auto 16px',
                    animation: 'spin 0.9s linear infinite',
                  }}
                />
                <p
                  style={{
                    margin: '0 0 8px',
                    fontWeight: 700,
                    color: GREEN.text,
                    fontSize: 15,
                  }}
                >
                  AIがコーデを考え中...
                </p>
                <p
                  style={{ margin: '0 0 16px', color: GREEN.mid, fontSize: 13 }}
                >
                  {sceneSteps[sceneStep]}
                </p>
                <LoadingBar step={sceneStep} total={sceneSteps.length} />
              </div>
            )}

            {sceneError && (
              <div
                style={{
                  background: '#FEF2F2',
                  borderRadius: 14,
                  padding: '14px 16px',
                  color: '#B91C1C',
                  fontSize: 14,
                  textAlign: 'center',
                }}
              >
                {sceneError}
              </div>
            )}

            {proposals && (
              <div
                style={{ display: 'flex', flexDirection: 'column', gap: 14 }}
              >
                <p
                  style={{
                    margin: '0 0 4px',
                    fontWeight: 700,
                    color: GREEN.text,
                    fontSize: 15,
                  }}
                >
                  「{sceneInput}」へのコーデ提案
                </p>
                {proposals.map((item, i) => (
                  <SceneCard key={i} item={item} idx={i} />
                ))}
                <button
                  className="act-btn"
                  onClick={() => {
                    setProposals(null);
                    setSceneInput('');
                  }}
                  style={{
                    padding: '13px',
                    background: '#fff',
                    border: `1.5px solid ${GREEN.accent}`,
                    borderRadius: 14,
                    color: GREEN.dark,
                    fontWeight: 600,
                    fontSize: 14,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 6,
                  }}
                >
                  <MessageCircle size={15} />
                  別のシーンを相談する
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
