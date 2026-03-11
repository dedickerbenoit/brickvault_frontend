import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { CubeIcon } from "@/assets/icons";
import { searchSets } from "@/services";
import type { SetData } from "@/services";

interface SetSearchInputProps {
  onSelect: (set: SetData) => void;
}

export default function SetSearchInput({ onSelect }: SetSearchInputProps) {
  const { t } = useTranslation();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SetData[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      setIsOpen(false);
      setSearchError("");
      return;
    }

    let cancelled = false;

    const timer = setTimeout(async () => {
      setIsSearching(true);
      setSearchError("");
      try {
        const data = await searchSets(query);
        if (!cancelled) {
          setResults(data);
          setIsOpen(true);
        }
      } catch {
        if (!cancelled) {
          setResults([]);
          setSearchError(t("sets.errors.loadingFailed"));
          setIsOpen(true);
        }
      } finally {
        if (!cancelled) {
          setIsSearching(false);
        }
      }
    }, 300);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [query, t]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative">
      <label htmlFor="set-search" className="block text-sm font-medium text-gray-700 mb-1">
        {t("sets.form.searchSet")}
      </label>
      <input
        id="set-search"
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
        placeholder={t("sets.form.searchPlaceholder")}
        onFocus={() => query.length >= 2 && results.length > 0 && setIsOpen(true)}
      />

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
          {isSearching && (
            <div className="p-3 text-sm text-gray-500">
              {t("sets.search.loading")}
            </div>
          )}
          {searchError && (
            <div className="p-3 text-sm text-red-600">
              {searchError}
            </div>
          )}
          {!isSearching && !searchError && results.length === 0 && query.length >= 2 && (
            <div className="p-3 text-sm text-gray-500">
              {t("sets.search.noResults")}
            </div>
          )}
          {results.map((set) => (
            <button
              key={set.id}
              type="button"
              onClick={() => {
                onSelect(set);
                setQuery(`${set.set_num} - ${set.name}`);
                setIsOpen(false);
              }}
              className="w-full text-left px-3 py-2 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0"
            >
              <div className="flex items-center gap-3">
                {set.img_url ? (
                  <img
                    src={set.img_url}
                    alt={set.name}
                    className="w-10 h-10 object-contain rounded"
                  />
                ) : (
                  <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center">
                    <CubeIcon className="w-5 h-5 text-gray-400" />
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-gray-900 truncate">
                    {set.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    #{set.set_num}
                    {set.theme && ` · ${set.theme.name}`}
                    {set.year && ` · ${set.year}`}
                    {set.num_parts != null &&
                      ` · ${t("sets.search.pieces", { count: set.num_parts })}`}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
