import { useMemo, useState } from "react";

/**
 * Generic sortable table. columns: [{ key, label, sort: (row)=>value, render: (row)=>node, align, width }]
 */
export function SortableTable({ columns, rows, defaultSort, defaultDir = "desc", onRowClick, rowKey = r => r.id, emptyText = "No rows." }) {
    const [sortKey, setSortKey] = useState(defaultSort || (columns[0] && columns[0].key));
    const [dir, setDir] = useState(defaultDir);

    const sorted = useMemo(() => {
        const col = columns.find(c => c.key === sortKey);
        if (!col) return rows;
        const get = col.sort || (r => r[col.key]);
        const mult = dir === "asc" ? 1 : -1;
        return [...rows].sort((a, b) => {
            const va = get(a), vb = get(b);
            if (va == null && vb == null) return 0;
            if (va == null) return 1;      // nulls last regardless of direction
            if (vb == null) return -1;
            if (typeof va === "string" || typeof vb === "string") return String(va).localeCompare(String(vb)) * mult;
            return (va - vb) * mult;
        });
    }, [rows, columns, sortKey, dir]);

    const toggle = key => {
        if (key === sortKey) setDir(d => (d === "asc" ? "desc" : "asc"));
        else { setSortKey(key); setDir(key === "name" ? "asc" : "desc"); }
    };

    return (
        <div className="fi-table-wrap">
            <table className="fi-table">
                <thead>
                    <tr>
                        {columns.map(c => (
                            <th key={c.key} style={{ width: c.width, textAlign: c.align || "left" }}
                                className={c.key === sortKey ? "fi-th--sorted" : ""}
                                onClick={() => toggle(c.key)} role="button" aria-sort={c.key === sortKey ? (dir === "asc" ? "ascending" : "descending") : "none"}>
                                {c.label}<span className="fi-sort-ind">{c.key === sortKey ? (dir === "asc" ? "↑" : "↓") : "↕"}</span>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {sorted.length === 0 && (
                        <tr><td colSpan={columns.length} className="fi-empty">{emptyText}</td></tr>
                    )}
                    {sorted.map(r => (
                        <tr key={rowKey(r)} onClick={onRowClick ? () => onRowClick(r) : undefined} className={onRowClick ? "fi-row--click" : ""}>
                            {columns.map(c => (
                                <td key={c.key} style={{ textAlign: c.align || "left" }}>{c.render ? c.render(r) : r[c.key]}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export function toCsv(columns, rows) {
    const esc = v => {
        const s = v == null ? "" : String(v);
        return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
    };
    const head = columns.map(c => esc(c.label)).join(",");
    const body = rows.map(r => columns.map(c => esc((c.csv || c.sort || (x => x[c.key]))(r))).join(","));
    return [head, ...body].join("\n");
}

export function downloadText(filename, text, mime = "text/csv;charset=utf-8") {
    const blob = new Blob([text], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = filename;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 2000);
}
