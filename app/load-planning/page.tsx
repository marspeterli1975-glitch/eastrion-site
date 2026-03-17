"use client";

import { useState } from "react";

export default function LoadPlanningPage() {
  const [mode, setMode] = useState<"manual" | "upload">("manual");

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="max-w-5xl mx-auto">

        {/* Title */}
        <h1 className="text-3xl font-bold text-blue-900 mb-4">
          Load Planning Tool
        </h1>
        <p className="text-gray-600 mb-10">
          Plan your shipment efficiently — container loading & inland truck estimation.
        </p>

        {/* Mode Switch */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setMode("manual")}
            className={`px-4 py-2 rounded-xl ${
              mode === "manual"
                ? "bg-blue-900 text-white"
                : "bg-white border text-gray-700"
            }`}
          >
            Manual Entry
          </button>

          <button
            onClick={() => setMode("upload")}
            className={`px-4 py-2 rounded-xl ${
              mode === "upload"
                ? "bg-blue-900 text-white"
                : "bg-white border text-gray-700"
            }`}
          >
            Upload Packing List
          </button>

          {/* Download Template */}
          <a
            href="/templates/packing_list_template.xlsx"
            className="px-4 py-2 rounded-xl bg-white border text-gray-700 hover:bg-gray-100"
          >
            Download Template
          </a>
        </div>

        {/* ===================== */}
        {/* Manual Entry */}
        {/* ===================== */}
        {mode === "manual" && (
          <div className="bg-white p-6 rounded-2xl shadow-sm border">

            <h2 className="text-xl font-semibold text-blue-900 mb-6">
              Manual Entry
            </h2>

            <div className="grid grid-cols-2 gap-4">

              <input placeholder="Product Name"
                className="input" />

              <input placeholder="Description"
                className="input" />

              <input placeholder="HS Code (auto suggestion later)"
                className="input" />

              <input placeholder="Quantity"
                type="number"
                className="input" />

              <input placeholder="Length (mm)"
                className="input" />

              <input placeholder="Width (mm)"
                className="input" />

              <input placeholder="Height (mm)"
                className="input" />

              <input placeholder="Weight (kg)"
                className="input" />

              <input placeholder="Max Stack Layers"
                className="input" />

              <select className="input">
                <option>Rotatable</option>
                <option>Yes</option>
                <option>No</option>
              </select>

              <select className="input">
                <option>Invertible</option>
                <option>Yes</option>
                <option>No</option>
              </select>

              <select className="input">
                <option>Cargo Form</option>
                <option>Solid</option>
                <option>Powder</option>
                <option>Liquid</option>
              </select>

              <select className="input">
                <option>Container Type</option>
                <option>20GP</option>
                <option>40GP</option>
                <option>40HQ</option>
              </select>

              <select className="input">
                <option>Truck Template</option>
                <option>9.6m Van</option>
                <option>13m Flatbed</option>
                <option>13.5m High Side</option>
                <option>17.5m Flatbed</option>
              </select>

            </div>

            <button className="mt-6 w-full bg-blue-900 text-white py-3 rounded-xl">
              Run Load Planning
            </button>
          </div>
        )}

        {/* ===================== */}
        {/* Upload Section */}
        {/* ===================== */}
        {mode === "upload" && (
          <div className="bg-white p-6 rounded-2xl shadow-sm border text-center">

            <h2 className="text-xl font-semibold text-blue-900 mb-4">
              Upload Packing List
            </h2>

            <p className="text-gray-500 mb-6">
              Upload your completed standard packing list (.xlsx / .csv)
            </p>

            <input
              type="file"
              className="mb-6"
            />

            <button className="bg-blue-900 text-white px-6 py-3 rounded-xl">
              Upload & Generate Plan
            </button>

          </div>
        )}

      </div>

      {/* Tailwind helper */}
      <style jsx>{`
        .input {
          border: 1px solid #e5e7eb;
          padding: 10px;
          border-radius: 10px;
          width: 100%;
        }
      `}</style>
    </div>
  );
}
