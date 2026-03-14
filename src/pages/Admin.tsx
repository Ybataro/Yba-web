import { useEffect, useState, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { Lock, Save, LogOut, Upload, Trash2, ChevronDown, ChevronRight, Check, Loader2 } from 'lucide-react';

const CMS_PIN = import.meta.env.VITE_CMS_PIN || '0000';
const STORAGE_BUCKET = 'cms-images';

// ===== Section 定義 =====
interface FieldDef {
  key: string;
  label: string;
  type: 'text' | 'textarea' | 'image' | 'array';
  arrayFields?: FieldDef[];
}

const sectionDefs: { section: string; label: string; fields: FieldDef[] }[] = [
  {
    section: 'hero',
    label: 'Hero 首屏',
    fields: [
      { key: 'badge', label: '徽章文字', type: 'text' },
      { key: 'title', label: '主標題', type: 'text' },
      { key: 'subtitle', label: '副標語', type: 'text' },
      { key: 'description', label: '描述第一行', type: 'text' },
      { key: 'descriptionLine2', label: '描述第二行', type: 'text' },
      { key: 'ctaPrimary', label: '主按鈕文字', type: 'text' },
      { key: 'ctaSecondary', label: '次按鈕文字', type: 'text' },
      { key: 'bgImage', label: '背景大圖', type: 'image' },
    ],
  },
  {
    section: 'story',
    label: '品牌故事',
    fields: [
      { key: 'storyTitle', label: '故事標題', type: 'text' },
      { key: 'storyTitleHighlight', label: '標題亮色文字', type: 'text' },
      { key: 'storyQuote', label: '引言', type: 'text' },
      { key: 'storyBody', label: '故事內文', type: 'textarea' },
      { key: 'mainImage', label: '食材大圖', type: 'image' },
      { key: 'floatImage', label: '浮動小圖', type: 'image' },
      { key: 'ctaText', label: 'CTA 按鈕文字', type: 'text' },
      { key: 'ctaSubtext', label: 'CTA 小文字', type: 'text' },
      {
        key: 'features',
        label: '特色卡片（3張）',
        type: 'array',
        arrayFields: [
          { key: 'title', label: '標題', type: 'text' },
          { key: 'description', label: '描述', type: 'text' },
        ],
      },
      {
        key: 'stats',
        label: '統計數字（3組）',
        type: 'array',
        arrayFields: [
          { key: 'number', label: '數字', type: 'text' },
          { key: 'suffix', label: '後綴', type: 'text' },
          { key: 'label', label: '說明', type: 'text' },
        ],
      },
    ],
  },
  {
    section: 'products',
    label: '招牌菜單',
    fields: [
      {
        key: 'signatureItems',
        label: '必點特色（3款）',
        type: 'array',
        arrayFields: [
          { key: 'title', label: '名稱', type: 'text' },
          { key: 'subtitle', label: '副標', type: 'text' },
          { key: 'description', label: '描述', type: 'textarea' },
          { key: 'image', label: '圖片', type: 'image' },
        ],
      },
      {
        key: 'categories',
        label: '菜單分類',
        type: 'array',
        arrayFields: [
          { key: 'id', label: 'ID', type: 'text' },
          { key: 'name', label: '分類名', type: 'text' },
          { key: 'description', label: '分類描述', type: 'text' },
        ],
      },
    ],
  },
  {
    section: 'frozen_shop',
    label: '冷凍宅配',
    fields: [
      { key: 'shippingFee', label: '運費說明', type: 'text' },
      { key: 'freeShipping', label: '免運門檻', type: 'text' },
      { key: 'deliveryTime', label: '出貨時間', type: 'text' },
      { key: 'deliveryNote', label: '出貨備註', type: 'text' },
      { key: 'paymentMethods', label: '付款方式', type: 'text' },
      { key: 'paymentNote', label: '付款備註', type: 'text' },
      { key: 'phoneOrderText', label: '電話訂購顯示', type: 'text' },
      { key: 'phoneOrderNumber', label: '電話號碼', type: 'text' },
    ],
  },
  {
    section: 'social_proof',
    label: '好評推薦',
    fields: [
      { key: 'heroImage', label: '特寫大圖', type: 'image' },
      {
        key: 'testimonials',
        label: '評論（3則）',
        type: 'array',
        arrayFields: [
          { key: 'source', label: '來源', type: 'text' },
          { key: 'name', label: '作者', type: 'text' },
          { key: 'content', label: '內容', type: 'textarea' },
          { key: 'rating', label: '星數', type: 'text' },
        ],
      },
      {
        key: 'promises',
        label: '品質承諾',
        type: 'array',
        arrayFields: [{ key: 'text', label: '文字', type: 'text' }],
      },
    ],
  },
  {
    section: 'stores',
    label: '門市資訊',
    fields: [
      {
        key: 'stores',
        label: '門市列表',
        type: 'array',
        arrayFields: [
          { key: 'name', label: '門市名', type: 'text' },
          { key: 'address', label: '地址', type: 'text' },
          { key: 'phone', label: '電話', type: 'text' },
          { key: 'hours', label: '營業時間', type: 'text' },
          { key: 'note', label: '備註', type: 'text' },
          { key: 'image', label: '門市照片', type: 'image' },
        ],
      },
    ],
  },
  {
    section: 'footer',
    label: 'Footer 頁尾',
    fields: [
      { key: 'brandName', label: '品牌名稱', type: 'text' },
      { key: 'brandNameEn', label: '英文品牌名', type: 'text' },
      { key: 'badge', label: '榮譽徽章', type: 'text' },
      { key: 'description', label: '品牌描述', type: 'textarea' },
      { key: 'phone', label: '聯絡電話', type: 'text' },
      { key: 'mainStoreAddress', label: '總店地址', type: 'text' },
      { key: 'branchAddress', label: '分店地址', type: 'text' },
      { key: 'hours', label: '營業時間', type: 'text' },
      { key: 'facebookUrl', label: 'Facebook 連結', type: 'text' },
      { key: 'instagramUrl', label: 'Instagram 連結', type: 'text' },
    ],
  },
];

// ===== 圖片上傳 =====
async function uploadImage(file: File, path: string): Promise<string> {
  const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg';
  const safePath = path.replace(/[^a-zA-Z0-9_-]/g, '_');
  const filePath = `${safePath}-${Date.now()}.${ext}`;
  const { error } = await supabase.storage.from(STORAGE_BUCKET).upload(filePath, file, {
    cacheControl: '3600',
    upsert: true,
  });
  if (error) throw error;
  const { data } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(filePath);
  return data.publicUrl;
}

// ===== PIN 登入 =====
function PinLogin({ onSuccess }: { onSuccess: () => void }) {
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === CMS_PIN) {
      sessionStorage.setItem('cms_auth', '1');
      onSuccess();
    } else {
      setError('PIN 碼錯誤');
      setPin('');
    }
  };

  return (
    <div className="min-h-screen bg-[hsl(25,15%,12%)] flex items-center justify-center px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-[hsl(var(--amber))]/15 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-[hsl(var(--amber))]" />
          </div>
          <h1 className="text-2xl font-bold text-white">CMS 管理後台</h1>
          <p className="text-white/40 text-sm mt-2">請輸入管理 PIN 碼</p>
        </div>

        <input
          type="password"
          inputMode="numeric"
          maxLength={6}
          autoComplete="one-time-code"
          value={pin}
          onChange={(e) => { setPin(e.target.value); setError(''); }}
          className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white text-center text-2xl tracking-[0.5em] placeholder:text-white/20 focus:outline-none focus:border-[hsl(var(--amber))] transition-colors"
          placeholder="••••"
          autoFocus
        />

        {error && <p className="text-red-400 text-sm text-center mt-3">{error}</p>}

        <button
          type="submit"
          className="w-full mt-6 py-3 bg-[hsl(var(--amber))] text-white font-bold rounded-xl hover:bg-[hsl(var(--amber-dark))] transition-colors"
        >
          登入
        </button>
      </form>
    </div>
  );
}

// ===== 圖片欄位 =====
function ImageField({
  value,
  onChange,
  label,
}: {
  value: string;
  onChange: (url: string) => void;
  label: string;
}) {
  const [uploading, setUploading] = useState(false);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadImage(file, label.replace(/\s/g, '-').toLowerCase());
      onChange(url);
    } catch (err) {
      alert('上傳失敗: ' + (err as Error).message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <label className="block text-white/60 text-sm mb-1.5">{label}</label>
      {value && (
        <div className="relative mb-2 rounded-lg overflow-hidden inline-block">
          <img src={value} alt={label} className="h-32 object-cover rounded-lg" />
          <button
            onClick={() => onChange('')}
            className="absolute top-1 right-1 p-1 bg-black/60 rounded-full text-white/80 hover:text-red-400"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
      <div className="flex items-center gap-3">
        <label className="cursor-pointer px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white/70 text-sm hover:bg-white/15 transition-colors inline-flex items-center gap-2">
          <Upload className="w-4 h-4" />
          {uploading ? '上傳中...' : '上傳圖片'}
          <input type="file" accept="image/*" onChange={handleFile} className="hidden" />
        </label>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="或輸入圖片 URL"
          className="flex-1 px-3 py-2 bg-white/5 border border-white/15 rounded-lg text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-[hsl(var(--amber))]/50"
        />
      </div>
    </div>
  );
}

// ===== 主管理介面 =====
function CmsEditor() {
  const [allContent, setAllContent] = useState<Record<string, Record<string, unknown>>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [saved, setSaved] = useState<string | null>(null);
  const [openSections, setOpenSections] = useState<Set<string>>(new Set(['hero']));

  // 載入所有 section
  const loadAll = useCallback(async () => {
    const { data } = await supabase.from('cms_content').select('section, content');
    if (data) {
      const map: Record<string, Record<string, unknown>> = {};
      for (const row of data) {
        map[row.section] = row.content as Record<string, unknown>;
      }
      setAllContent(map);
    }
    setLoading(false);
  }, []);

  useEffect(() => { loadAll(); }, [loadAll]);

  const getVal = (section: string, key: string) => {
    return allContent[section]?.[key] ?? '';
  };

  const setVal = (section: string, key: string, value: unknown) => {
    setAllContent((prev) => ({
      ...prev,
      [section]: { ...(prev[section] || {}), [key]: value },
    }));
  };

  const getArray = (section: string, key: string): Record<string, unknown>[] => {
    const arr = allContent[section]?.[key];
    return Array.isArray(arr) ? arr : [];
  };

  const setArrayItem = (section: string, key: string, index: number, field: string, value: unknown) => {
    const arr = [...getArray(section, key)];
    arr[index] = { ...arr[index], [field]: value };
    setVal(section, key, arr);
  };

  const handleSave = async (section: string) => {
    setSaving(section);
    const content = allContent[section] || {};
    const { error } = await supabase.from('cms_content').upsert(
      { section, content, updated_at: new Date().toISOString() },
      { onConflict: 'section' },
    );
    setSaving(null);
    if (error) {
      alert('儲存失敗: ' + error.message);
    } else {
      setSaved(section);
      setTimeout(() => setSaved(null), 2000);
    }
  };

  const toggleSection = (section: string) => {
    setOpenSections((prev) => {
      const next = new Set(prev);
      if (next.has(section)) next.delete(section);
      else next.add(section);
      return next;
    });
  };

  const handleLogout = () => {
    sessionStorage.removeItem('cms_auth');
    window.location.reload();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[hsl(25,15%,12%)] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-[hsl(var(--amber))] animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[hsl(25,15%,12%)]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[hsl(25,15%,12%)]/95 backdrop-blur-sm border-b border-white/10 px-4 sm:px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-white">CMS 管理</h1>
            <p className="text-white/30 text-sm">阿爸的芋圓 — 落地頁內容管理</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 text-white/50 hover:text-white/80 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span className="text-sm">登出</span>
          </button>
        </div>
      </header>

      {/* 內容區 */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-4">
        {sectionDefs.map((def) => {
          const isOpen = openSections.has(def.section);

          return (
            <div
              key={def.section}
              className="rounded-2xl border border-white/10 overflow-hidden bg-white/[0.02]"
            >
              {/* Section Header */}
              <button
                onClick={() => toggleSection(def.section)}
                className="w-full flex items-center justify-between px-6 py-4 hover:bg-white/5 transition-colors"
              >
                <div className="flex items-center gap-3">
                  {isOpen ? (
                    <ChevronDown className="w-5 h-5 text-[hsl(var(--amber))]" />
                  ) : (
                    <ChevronRight className="w-5 h-5 text-white/30" />
                  )}
                  <span className="text-white font-semibold">{def.label}</span>
                  <span className="text-white/20 text-sm">({def.section})</span>
                </div>
                {saved === def.section && (
                  <span className="flex items-center gap-1 text-green-400 text-sm">
                    <Check className="w-4 h-4" /> 已儲存
                  </span>
                )}
              </button>

              {/* Section Body */}
              {isOpen && (
                <div className="px-6 pb-6 space-y-5 border-t border-white/5 pt-5">
                  {def.fields.map((field) => {
                    if (field.type === 'array' && field.arrayFields) {
                      const arr = getArray(def.section, field.key);
                      return (
                        <div key={field.key} className="space-y-3">
                          <div className="flex items-center justify-between">
                            <label className="text-white/70 text-sm font-medium">{field.label}</label>
                            <button
                              onClick={() => {
                                const newItem: Record<string, unknown> = {};
                                field.arrayFields!.forEach((af) => { newItem[af.key] = ''; });
                                setVal(def.section, field.key, [...arr, newItem]);
                              }}
                              className="text-xs px-3 py-1 bg-[hsl(var(--amber))]/20 text-[hsl(var(--amber))] rounded-lg hover:bg-[hsl(var(--amber))]/30 transition-colors"
                            >
                              + 新增
                            </button>
                          </div>
                          {arr.map((item, idx) => (
                            <div key={idx} className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-3">
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-white/40 text-xs font-medium">#{idx + 1}</span>
                                <button
                                  onClick={() => {
                                    const newArr = arr.filter((_, i) => i !== idx);
                                    setVal(def.section, field.key, newArr);
                                  }}
                                  className="text-red-400/60 hover:text-red-400 transition-colors"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                              {field.arrayFields!.map((af) =>
                                af.type === 'image' ? (
                                  <ImageField
                                    key={af.key}
                                    label={af.label}
                                    value={(item[af.key] as string) || ''}
                                    onChange={(url) => setArrayItem(def.section, field.key, idx, af.key, url)}
                                  />
                                ) : af.type === 'textarea' ? (
                                  <div key={af.key}>
                                    <label className="block text-white/60 text-sm mb-1.5">{af.label}</label>
                                    <textarea
                                      value={(item[af.key] as string) || ''}
                                      onChange={(e) => setArrayItem(def.section, field.key, idx, af.key, e.target.value)}
                                      rows={3}
                                      className="w-full px-3 py-2 bg-white/5 border border-white/15 rounded-lg text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-[hsl(var(--amber))]/50 resize-y"
                                    />
                                  </div>
                                ) : (
                                  <div key={af.key}>
                                    <label className="block text-white/60 text-sm mb-1.5">{af.label}</label>
                                    <input
                                      type="text"
                                      value={(item[af.key] as string) || ''}
                                      onChange={(e) => setArrayItem(def.section, field.key, idx, af.key, e.target.value)}
                                      className="w-full px-3 py-2 bg-white/5 border border-white/15 rounded-lg text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-[hsl(var(--amber))]/50"
                                    />
                                  </div>
                                ),
                              )}
                            </div>
                          ))}
                        </div>
                      );
                    }

                    if (field.type === 'image') {
                      return (
                        <ImageField
                          key={field.key}
                          label={field.label}
                          value={(getVal(def.section, field.key) as string) || ''}
                          onChange={(url) => setVal(def.section, field.key, url)}
                        />
                      );
                    }

                    if (field.type === 'textarea') {
                      return (
                        <div key={field.key}>
                          <label className="block text-white/60 text-sm mb-1.5">{field.label}</label>
                          <textarea
                            value={(getVal(def.section, field.key) as string) || ''}
                            onChange={(e) => setVal(def.section, field.key, e.target.value)}
                            rows={4}
                            className="w-full px-3 py-2 bg-white/5 border border-white/15 rounded-lg text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-[hsl(var(--amber))]/50 resize-y"
                          />
                        </div>
                      );
                    }

                    return (
                      <div key={field.key}>
                        <label className="block text-white/60 text-sm mb-1.5">{field.label}</label>
                        <input
                          type="text"
                          value={(getVal(def.section, field.key) as string) || ''}
                          onChange={(e) => setVal(def.section, field.key, e.target.value)}
                          className="w-full px-3 py-2 bg-white/5 border border-white/15 rounded-lg text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-[hsl(var(--amber))]/50"
                        />
                      </div>
                    );
                  })}

                  {/* 儲存按鈕 */}
                  <button
                    onClick={() => handleSave(def.section)}
                    disabled={saving === def.section}
                    className="mt-4 flex items-center gap-2 px-6 py-2.5 bg-[hsl(var(--amber))] text-white font-semibold rounded-xl hover:bg-[hsl(var(--amber-dark))] transition-colors disabled:opacity-50"
                  >
                    {saving === def.section ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Save className="w-4 h-4" />
                    )}
                    {saving === def.section ? '儲存中...' : '儲存此區塊'}
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ===== 主 Export =====
export default function Admin() {
  const [authed, setAuthed] = useState(sessionStorage.getItem('cms_auth') === '1');

  if (!authed) {
    return <PinLogin onSuccess={() => setAuthed(true)} />;
  }

  return <CmsEditor />;
}
