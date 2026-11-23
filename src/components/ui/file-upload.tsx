"use client";

import { useId, useRef, useState } from "react";
import { LayoutGroup, motion, useReducedMotion } from "motion/react";
import { FileSpreadsheet, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const maxBytes = 20 * 1024 * 1024;

// Aceternity File Upload's shared-layout file tile, with a native shadcn input.
// https://ui.aceternity.com/components/file-upload
// No decorative grid or dropzone dependency; keyboard and drag/drop share validation.
export function FileUpload({ file, onChange, disabled = false }: { file: File | null; onChange: (file: File | null) => void; disabled?: boolean }) {
  const id = useId();
  const input = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState("");
  const reducedMotion = useReducedMotion();

  function selectFiles(files: File[]) {
    if (disabled || files.length === 0) return;
    if (files.length !== 1) { setError("Pilih satu file CSV atau XLSX untuk setiap impor."); return; }
    const selected = files[0];
    if (!/\.(csv|xlsx|xls)$/i.test(selected.name)) { setError("Format tidak didukung. Gunakan file CSV, XLSX, atau XLS."); return; }
    if (selected.size > maxBytes) { setError("Ukuran file melebihi 20 MB. Pilih file yang lebih kecil."); return; }
    setError("");
    onChange(selected);
  }

  return <LayoutGroup id={id}>
    <div data-aceternity="file-upload" className="file-upload">
      <motion.div
        className={`dropzone${dragging ? " dragging" : ""}`}
        whileHover={disabled || reducedMotion ? undefined : "hover"}
        onDragOver={(event) => { event.preventDefault(); if (!disabled) setDragging(true); }}
        onDragLeave={(event) => { if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setDragging(false); }}
        onDrop={(event) => { event.preventDefault(); setDragging(false); selectFiles(Array.from(event.dataTransfer.files)); }}
      >
        <Input ref={input} id={`${id}-file`} className="file-upload-input" type="file" accept=".csv,.xlsx,.xls" disabled={disabled}
          aria-invalid={Boolean(error)} aria-describedby={`${id}-help${error ? ` ${id}-error` : ""}`}
          onChange={(event) => { selectFiles(Array.from(event.target.files ?? [])); event.target.value = ""; }} />
        <Label className="file-upload-label" htmlFor={`${id}-file`}>
          <motion.span key={file ? "selected" : "empty"} layoutId="file-tile" className="file-upload-tile"
            variants={{ hover: { y: file || reducedMotion ? 0 : -4 } }} transition={{ duration: reducedMotion ? 0 : 0.18 }} aria-hidden="true">
            {file ? <FileSpreadsheet size={23} /> : <Upload size={23} />}
          </motion.span>
          <strong>{file ? file.name : "Pilih file CSV atau XLSX"}</strong>
          <span id={`${id}-help`}>{file ? `${(file.size / 1024).toFixed(0)} KB · siap dipratinjau` : "Tarik file ke sini atau pilih berkas · maksimum 20 MB"}</span>
        </Label>
      </motion.div>
      {file && <Button variant="ghost" size="sm" className="file-upload-remove" disabled={disabled} onClick={() => { onChange(null); setError(""); }}><X size={14} /> Hapus berkas</Button>}
      {error && <p id={`${id}-error`} className="file-upload-error" role="alert">{error}</p>}
    </div>
  </LayoutGroup>;
}
