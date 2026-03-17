"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type CargoForm = "solid" | "powder" | "liquid";
type TransportMode = "container" | "inland_truck";
type ContainerType = "20GP" | "40GP" | "40HQ";
type TruckTemplate =
  | "9.6m van"
  | "9.6m high side"
  | "13m flatbed"
  | "13.5m high side"
  | "17.5m flatbed";

type LoadForm = {
  itemName: string;
  lengthMm: string;
  widthMm: string;
  heightMm: string;
  weightKg: string;
  quantity: string;
  cargoForm: CargoForm;
  maxStackLayers: string;
  rotatable: boolean;
  invertible: boolean;
  allowMixedLoad: boolean;
  transportMode: TransportMode;
  containerType: ContainerType;
  truckTemplate: TruckTemplate;
  onlyChinaVI: boolean;
  heightRestrictionAlert: boolean;
  weightRestrictionAlert: boolean;
  appointmentRequired: boolean;
  closedBodyPreferred: boolean;
  note: string;
};

type SpaceSpec = {
  label: string;
  innerLengthMm: number;
  innerWidthMm: number;
  innerHeightMm: number;
  maxPayloadKg: number;
  category: "container" | "truck";
};

type Orientation = {
  l: number;
  w: number;
  h: number;
  name: string;
};

const containerSpecs: Record<ContainerType, SpaceSpec> = {
  "20GP": {
    label: "20GP",
    innerLengthMm: 5898,
    innerWidthMm: 2352,
    innerHeightMm: 2393,
    maxPayloadKg: 28200,
    category: "container",
  },
  "40GP": {
    label: "40GP",
    innerLengthMm: 12032,
    innerWidthMm: 2352,
    innerHeightMm: 2393,
    maxPayloadKg: 26700,
    category: "container",
  },
  "40HQ": {
    label: "40HQ",
    innerLengthMm: 12032,
    innerWidthMm: 2352,
    innerHeightMm: 2698,
    maxPayloadKg: 26500,
    category: "container",
  },
};

const truckSpecs: Record<TruckTemplate, SpaceSpec> = {
  "9.6m van": {
    label: "9.6m van",
    innerLengthMm: 9600,
    innerWidthMm: 2400,
    innerHeightMm: 2500,
    maxPayloadKg: 12000,
    category: "truck",
  },
  "9.6m high side": {
    label: "9.6m high side",
    innerLengthMm: 9600,
    innerWidthMm: 2400,
    innerHeightMm: 2400,
    maxPayloadKg: 15000,
    category: "truck",
  },
  "13m flatbed": {
    label: "13m flatbed",
    innerLengthMm: 13000,
    innerWidthMm: 2500,
    innerHeightMm: 3000,
    maxPayloadKg: 32000,
    category: "truck",
  },
  "13.5m high side": {
    label: "13.5m high side",
    innerLengthMm: 13500,
    innerWidthMm: 2400,
    innerHeightMm: 2600,
    maxPayloadKg: 30000,
    category: "truck",
  },
  "17.5m flatbed": {
    label: "17.5m flatbed",
    innerLengthMm: 17500,
    innerWidthMm: 3000,
    innerHeightMm: 3000,
    maxPayloadKg: 35000,
    category: "truck",
  },
};

function mm3ToM3(mm3: number) {
  return mm3 / 1_000_000_000;
}

function percent(value: number) {
  if (!Number.isFinite(value)) return "0.0%";
  return `${(value * 100).toFixed(1)}%`;
}

function ceilDiv(a: number, b: number) {
  if (b <= 0) return 0;
  return Math.ceil(a / b);
}

function getOrientations(
  length: number,
  width: number,
  height: number,
  rotatable: boolean,
  invertible: boolean
): Orientation[] {
  const base: Orientation[] = [{ l: length, w: width, h: height, name: "L×W×H" }];

  if (!rotatable && !invertible) {
    return base;
  }

  const set = new Map<string, Orientation>();

  const add = (l: number, w: number, h: number, name: string) => {
    const key = `${l}-${w}-${h}`;
    if (!set.has(key)) {
      set.set(key, { l, w, h, name });
    }
  };

  add(length, width, height, "L×W×H");

  if (rotatable) {
    add(width, length, height, "W×L×H");
  }

  if (invertible) {
    add(length, width, height, "L×W×H");
    add(length, height, width, "L×H×W");
    add(width, height, length, "W×H×L");
    if (rotatable) {
      add(width, length, height, "W×L×H");
      add(height, length, width, "H×L×W");
      add(height, width, length, "H×W×L");
    }
  }

  return Array.from(set.values());
}

function calculateUnitsPerSpace(
  space: SpaceSpec,
  item: {
    lengthMm: number;
    widthMm: number;
    heightMm: number;
    weightKg: number;
    maxStackLayers: number;
    rotatable: boolean;
    invertible: boolean;
  }
) {
  const orientations = getOrientations(
    item.lengthMm,
    item.widthMm,
    item.heightMm,
    item.rotatable,
    item.invertible
  );

  let best = {
    unitsByLayout: 0,
    unitsByWeight: Math.floor(space.maxPayloadKg / item.weightKg),
    unitsPerSpace: 0,
    orientation: "N/A",
    stackApplied: 1,
    fitted: false,
  };

  for (const o of orientations) {
    const fitX = Math.floor(space.innerLengthMm / o.l);
    const fitY = Math.floor(space.innerWidthMm / o.w);
    const fitZ = Math.floor(space.innerHeightMm / o.h);

    const allowedLayers = Math.max(1, item.maxStackLayers);
    const verticalLayers = Math.min(fitZ, allowedLayers);

    const unitsByLayout = fitX * fitY * verticalLayers;
    const unitsByWeight = Math.floor(space.maxPayloadKg / item.weightKg);
    const unitsPerSpace = Math.max(0, Math.min(unitsByLayout, unitsByWeight));

    if (unitsPerSpace > best.unitsPerSpace) {
      best = {
        unitsByLayout,
        unitsByWeight,
        unitsPerSpace,
        orientation: o.name,
        stackApplied: verticalLayers,
        fitted: unitsByLayout > 0 && unitsByWeight > 0,
      };
    }
  }

  return best;
}

function recommendBestContainer(item: {
  lengthMm: number;
  widthMm: number;
  heightMm: number;
  weightKg: number;
  quantity: number;
  maxStackLayers: number;
  rotatable: boolean;
  invertible: boolean;
}) {
  const candidates = (Object.keys(containerSpecs) as ContainerType[]).map((type) => {
    const spec = containerSpecs[type];
    const calc = calculateUnitsPerSpace(spec, item);
    const containerVolume = mm3ToM3(
      spec.innerLengthMm * spec.innerWidthMm * spec.innerHeightMm
    );
    const itemVolume = mm3ToM3(item.lengthMm * item.widthMm * item.heightMm);
    const estimatedCount = calc.unitsPerSpace;
    const estimatedContainers = estimatedCount > 0 ? ceilDiv(item.quantity, estimatedCount) : 0;
    const totalItemVolume = itemVolume * item.quantity;
    const usedVolumePerContainer = itemVolume * estimatedCount;
    const volumeUtilization = containerVolume > 0 ? usedVolumePerContainer / containerVolume : 0;
    const weightUtilization =
      spec.maxPayloadKg > 0 ? (estimatedCount * item.weightKg) / spec.maxPayloadKg : 0;

    return {
      type,
      spec,
      calc,
      estimatedCount,
      estimatedContainers,
      containerVolume,
      itemVolume,
      totalItemVolume,
      volumeUtilization,
      weightUtilization,
    };
  });

  const valid = candidates.filter((c) => c.estimatedCount > 0);

  if (valid.length === 0) return null;

  valid.sort((a, b) => {
    if (a.estimatedContainers !== b.estimatedContainers) {
      return a.estimatedContainers - b.estimatedContainers;
    }
    return b.volumeUtilization - a.volumeUtilization;
  });

  return valid[0];
}

function buildConstraintAlerts(form: LoadForm, isContainer: boolean) {
  const alerts: string[] = [];

  if (form.maxStackLayers && Number(form.maxStackLayers) <= 1) {
    alerts.push("Stacking restricted: cargo is effectively single-layer or non-stackable.");
  } else if (form.maxStackLayers && Number(form.maxStackLayers) <= 3) {
    alerts.push("Limited stacking allowed: actual load plan may be constrained before full cubic utilization.");
  }

  if (form.cargoForm === "powder") {
    alerts.push("Powder cargo may require extra packaging stability and contamination segregation review.");
  }

  if (form.cargoForm === "liquid") {
    alerts.push("Liquid cargo may require leak prevention, pallet stability, and stricter loading checks.");
  }

  if (!form.rotatable) {
    alerts.push("Rotation not allowed: footprint optimization is limited.");
  }

  if (!form.invertible) {
    alerts.push("Inversion not allowed: vertical placement flexibility is limited.");
  }

  if (!form.allowMixedLoad) {
    alerts.push("Mixed loading not allowed: this cargo should be planned as dedicated space.");
  }

  if (!isContainer) {
    if (form.onlyChinaVI) {
      alerts.push("China VI truck may be required for destination access.");
    }
    if (form.heightRestrictionAlert) {
      alerts.push("Height restriction alert: route or site entry may require special validation.");
    }
    if (form.weightRestrictionAlert) {
      alerts.push("Weight restriction alert: axle load / gross vehicle access should be checked before dispatch.");
    }
    if (form.appointmentRequired) {
      alerts.push("Appointment required at destination or plant gate.");
    }
    if (form.closedBodyPreferred) {
      alerts.push("Closed body preferred: van truck may be operationally safer than open flatbed/high-side.");
    }
  }

  if (form.note.trim()) {
    alerts.push(`Planner note: ${form.note.trim()}`);
  }

  return alerts;
}

export default function LoadPlanningPage() {
  const [form, setForm] = useState<LoadForm>({
    itemName: "Battery module skid",
    lengthMm: "1200",
    widthMm: "1000",
    heightMm: "1100",
    weightKg: "850",
    quantity: "28",
    cargoForm: "solid",
    maxStackLayers: "2",
    rotatable: true,
    invertible: false,
    allowMixedLoad: false,
    transportMode: "container",
    containerType: "40HQ",
    truckTemplate: "13m flatbed",
    onlyChinaVI: false,
    heightRestrictionAlert: false,
    weightRestrictionAlert: false,
    appointmentRequired: false,
    closedBodyPreferred: false,
    note: "",
  });

  const parsed = useMemo(() => {
    const lengthMm = Number(form.lengthMm) || 0;
    const widthMm = Number(form.widthMm) || 0;
    const heightMm = Number(form.heightMm) || 0;
    const weightKg = Number(form.weightKg) || 0;
    const quantity = Number(form.quantity) || 0;
    const maxStackLayers = Math.max(1, Number(form.maxStackLayers) || 1);

    const valid =
      lengthMm > 0 &&
      widthMm > 0 &&
      heightMm > 0 &&
      weightKg > 0 &&
      quantity > 0 &&
      maxStackLayers > 0;

    return {
      valid,
      lengthMm,
      widthMm,
      heightMm,
      weightKg,
      quantity,
      maxStackLayers,
      itemVolumeM3: mm3ToM3(lengthMm * widthMm * heightMm),
      totalItemVolumeM3: mm3ToM3(lengthMm * widthMm * heightMm) * quantity,
      totalWeightKg: weightKg * quantity,
    };
  }, [form]);

  const containerResult = useMemo(() => {
    if (!parsed.valid) return null;

    const item = {
      lengthMm: parsed.lengthMm,
      widthMm: parsed.widthMm,
      heightMm: parsed.heightMm,
      weightKg: parsed.weightKg,
      quantity: parsed.quantity,
      maxStackLayers: parsed.maxStackLayers,
      rotatable: form.rotatable,
      invertible: form.invertible,
    };

    const selectedSpec = containerSpecs[form.containerType];
    const selectedCalc = calculateUnitsPerSpace(selectedSpec, item);

    const selectedVolume = mm3ToM3(
      selectedSpec.innerLengthMm * selectedSpec.innerWidthMm * selectedSpec.innerHeightMm
    );
    const selectedUnits = selectedCalc.unitsPerSpace;
    const selectedContainers =
      selectedUnits > 0 ? ceilDiv(parsed.quantity, selectedUnits) : 0;
    const selectedVolumeUtil =
      selectedVolume > 0 ? (parsed.itemVolumeM3 * selectedUnits) / selectedVolume : 0;
    const selectedWeightUtil =
      selectedSpec.maxPayloadKg > 0
        ? (selectedUnits * parsed.weightKg) / selectedSpec.maxPayloadKg
        : 0;

    const best = recommendBestContainer(item);

    return {
      selectedSpec,
      selectedCalc,
      selectedUnits,
      selectedContainers,
      selectedVolumeUtil,
      selectedWeightUtil,
      best,
      alerts: buildConstraintAlerts(form, true),
    };
  }, [form, parsed]);

  const truckResult = useMemo(() => {
    if (!parsed.valid) return null;

    const item = {
      lengthMm: parsed.lengthMm,
      widthMm: parsed.widthMm,
      heightMm: parsed.heightMm,
      weightKg: parsed.weightKg,
      maxStackLayers: parsed.maxStackLayers,
      rotatable: form.rotatable,
      invertible: form.invertible,
    };

    const selectedSpec = truckSpecs[form.truckTemplate];
    const selectedCalc = calculateUnitsPerSpace(selectedSpec, item);

    const truckVolume = mm3ToM3(
      selectedSpec.innerLengthMm * selectedSpec.innerWidthMm * selectedSpec.innerHeightMm
    );
    const selectedUnits = selectedCalc.unitsPerSpace;
    const requiredTrips = selectedUnits > 0 ? ceilDiv(parsed.quantity, selectedUnits) : 0;
    const volumeUtil =
      truckVolume > 0 ? (parsed.itemVolumeM3 * selectedUnits) / truckVolume : 0;
    const weightUtil =
      selectedSpec.maxPayloadKg > 0
        ? (selectedUnits * parsed.weightKg) / selectedSpec.maxPayloadKg
        : 0;

    const allTruckCandidates = (Object.keys(truckSpecs) as TruckTemplate[]).map((type) => {
      const spec = truckSpecs[type];
      const calc = calculateUnitsPerSpace(spec, item);
      const trips = calc.unitsPerSpace > 0 ? ceilDiv(parsed.quantity, calc.unitsPerSpace) : 0;
      return { type, spec, calc, trips };
    });

    const validCandidates = allTruckCandidates.filter((x) => x.calc.unitsPerSpace > 0);
    validCandidates.sort((a, b) => {
      if (a.trips !== b.trips) return a.trips - b.trips;
      return b.calc.unitsPerSpace - a.calc.unitsPerSpace;
    });

    const best = validCandidates[0] ?? null;

    const riskFlags: string[] = [];
    if (selectedUnits <= 0) {
      riskFlags.push("Item cannot be fitted into selected truck template under current constraints.");
    }
    if (form.heightRestrictionAlert) {
      riskFlags.push("Potential route/site height restriction risk.");
    }
    if (form.weightRestrictionAlert) {
      riskFlags.push("Potential gross/axle weight restriction risk.");
    }
    if (form.onlyChinaVI) {
      riskFlags.push("Destination may reject non-China VI trucks.");
    }
    if (form.closedBodyPreferred && !form.truckTemplate.includes("van")) {
      riskFlags.push("Closed body preferred, but selected template is not a van body.");
    }

    return {
      selectedSpec,
      selectedCalc,
      selectedUnits,
      requiredTrips,
      volumeUtil,
      weightUtil,
      best,
      riskFlags,
      alerts: buildConstraintAlerts(form, false),
    };
  }, [form, parsed]);

  const setField = <K extends keyof LoadForm>(key: K, value: LoadForm[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <main className="min-h-screen bg-[#f4f6f8] text-slate-900">
      <section className="border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto max-w-7xl px-6 py-5 lg:px-10">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <Link
                href="/"
                className="text-sm font-medium text-slate-500 transition hover:text-slate-800"
              >
                ← Back to Eastrion
              </Link>
              <h1 className="mt-2 text-3xl font-semibold tracking-tight text-[#123b66] md:text-4xl">
                Load Planning
              </h1>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600 md:text-base">
                Planning-grade capacity estimation for container loading and inland truck deployment.
                Designed for industrial cargo, cross-border sourcing, and real supply chain execution.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600 shadow-sm">
              <div className="font-medium text-slate-800">Version 1 scope</div>
              <div className="mt-1">
                Container Planning + Truck Template Planning
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-8 lg:px-10">
        <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-[#123b66]">
                    Planning Input
                  </h2>
                  <p className="mt-1 text-sm text-slate-600">
                    Use common transport templates first. Parameters can be refined later with backend rules.
                  </p>
                </div>

                <div className="inline-flex rounded-full border border-slate-200 bg-slate-50 p-1">
                  <button
                    onClick={() => setField("transportMode", "container")}
                    className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                      form.transportMode === "container"
                        ? "bg-[#123b66] text-white shadow-sm"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    Container Planning
                  </button>
                  <button
                    onClick={() => setField("transportMode", "inland_truck")}
                    className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                      form.transportMode === "inland_truck"
                        ? "bg-[#123b66] text-white shadow-sm"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    Inland Truck Planning
                  </button>
                </div>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <Field
                  label="Item name"
                  value={form.itemName}
                  onChange={(v) => setField("itemName", v)}
                  placeholder="e.g. Battery module skid"
                />
                <SelectField
                  label="Cargo form"
                  value={form.cargoForm}
                  onChange={(v) => setField("cargoForm", v as CargoForm)}
                  options={[
                    { label: "solid", value: "solid" },
                    { label: "powder", value: "powder" },
                    { label: "liquid", value: "liquid" },
                  ]}
                />

                <Field
                  label="Length (mm)"
                  value={form.lengthMm}
                  onChange={(v) => setField("lengthMm", v)}
                  placeholder="1200"
                  type="number"
                />
                <Field
                  label="Width (mm)"
                  value={form.widthMm}
                  onChange={(v) => setField("widthMm", v)}
                  placeholder="1000"
                  type="number"
                />

                <Field
                  label="Height (mm)"
                  value={form.heightMm}
                  onChange={(v) => setField("heightMm", v)}
                  placeholder="1100"
                  type="number"
                />
                <Field
                  label="Weight (kg)"
                  value={form.weightKg}
                  onChange={(v) => setField("weightKg", v)}
                  placeholder="850"
                  type="number"
                />

                <Field
                  label="Quantity"
                  value={form.quantity}
                  onChange={(v) => setField("quantity", v)}
                  placeholder="28"
                  type="number"
                />
                <Field
                  label="Max stack layers"
                  value={form.maxStackLayers}
                  onChange={(v) => setField("maxStackLayers", v)}
                  placeholder="2"
                  type="number"
                />

                <ToggleField
                  label="Rotatable"
                  checked={form.rotatable}
                  onChange={(v) => setField("rotatable", v)}
                />
                <ToggleField
                  label="Invertible"
                  checked={form.invertible}
                  onChange={(v) => setField("invertible", v)}
                />

                <ToggleField
                  label="Allow mixed load"
                  checked={form.allowMixedLoad}
                  onChange={(v) => setField("allowMixedLoad", v)}
                />
              </div>

              <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                  Transport Selection
                </h3>

                {form.transportMode === "container" ? (
                  <div className="mt-4">
                    <SelectField
                      label="Container type"
                      value={form.containerType}
                      onChange={(v) => setField("containerType", v as ContainerType)}
                      options={[
                        { label: "20GP", value: "20GP" },
                        { label: "40GP", value: "40GP" },
                        { label: "40HQ", value: "40HQ" },
                      ]}
                    />
                  </div>
                ) : (
                  <div className="mt-4">
                    <SelectField
                      label="Truck template"
                      value={form.truckTemplate}
                      onChange={(v) => setField("truckTemplate", v as TruckTemplate)}
                      options={[
                        { label: "9.6m van", value: "9.6m van" },
                        { label: "9.6m high side", value: "9.6m high side" },
                        { label: "13m flatbed", value: "13m flatbed" },
                        { label: "13.5m high side", value: "13.5m high side" },
                        { label: "17.5m flatbed", value: "17.5m flatbed" },
                      ]}
                    />
                  </div>
                )}
              </div>

              <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                  Destination Constraints
                </h3>

                <div className="mt-4 grid gap-3 md:grid-cols-2">
                  <ToggleField
                    label="Only China VI"
                    checked={form.onlyChinaVI}
                    onChange={(v) => setField("onlyChinaVI", v)}
                  />
                  <ToggleField
                    label="Height restriction alert"
                    checked={form.heightRestrictionAlert}
                    onChange={(v) => setField("heightRestrictionAlert", v)}
                  />
                  <ToggleField
                    label="Weight restriction alert"
                    checked={form.weightRestrictionAlert}
                    onChange={(v) => setField("weightRestrictionAlert", v)}
                  />
                  <ToggleField
                    label="Appointment required"
                    checked={form.appointmentRequired}
                    onChange={(v) => setField("appointmentRequired", v)}
                  />
                  <ToggleField
                    label="Closed body preferred"
                    checked={form.closedBodyPreferred}
                    onChange={(v) => setField("closedBodyPreferred", v)}
                  />
                </div>

                <div className="mt-4">
                  <TextAreaField
                    label="Free text note"
                    value={form.note}
                    onChange={(v) => setField("note", v)}
                    placeholder="e.g. Plant entry gate height unclear, forklift unloading required."
                  />
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-[#123b66]">
                Input Summary
              </h2>

              <div className="mt-4 grid gap-4 md:grid-cols-3">
                <MetricCard label="Item volume" value={`${parsed.itemVolumeM3.toFixed(3)} m³`} />
                <MetricCard label="Total volume" value={`${parsed.totalItemVolumeM3.toFixed(3)} m³`} />
                <MetricCard label="Total weight" value={`${parsed.totalWeightKg.toFixed(0)} kg`} />
              </div>

              <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
                This version is a planning estimator, not a 3D loading engine. It uses template dimensions,
                stack-layer constraints, orientation permissions, and payload ceilings to generate an initial recommendation.
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {form.transportMode === "container" ? (
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-semibold text-[#123b66]">
                      Container Planning Result
                    </h2>
                    <p className="mt-1 text-sm text-slate-600">
                      Initial estimate based on selected container and best-fit recommendation.
                    </p>
                  </div>

                  <span className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold text-[#123b66]">
                    Estimator v1
                  </span>
                </div>

                {!parsed.valid || !containerResult ? (
                  <EmptyState text="Please complete the core cargo fields to generate the planning result." />
                ) : (
                  <div className="mt-6 space-y-6">
                    <div className="grid gap-4 md:grid-cols-2">
                      <MetricCard
                        label="Selected container"
                        value={containerResult.selectedSpec.label}
                      />
                      <MetricCard
                        label="Recommended container"
                        value={containerResult.best?.type ?? "N/A"}
                      />
                      <MetricCard
                        label="Est. max units / selected container"
                        value={`${containerResult.selectedUnits}`}
                      />
                      <MetricCard
                        label="Est. container count"
                        value={`${containerResult.selectedContainers}`}
                      />
                      <MetricCard
                        label="Volume utilization"
                        value={percent(containerResult.selectedVolumeUtil)}
                      />
                      <MetricCard
                        label="Weight utilization"
                        value={percent(containerResult.selectedWeightUtil)}
                      />
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                      <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                        Recommendation Detail
                      </h3>
                      <div className="mt-3 grid gap-3 text-sm text-slate-700">
                        <InfoRow
                          label="Best-fit container"
                          value={containerResult.best?.type ?? "N/A"}
                        />
                        <InfoRow
                          label="Best-fit units per container"
                          value={`${containerResult.best?.estimatedCount ?? 0}`}
                        />
                        <InfoRow
                          label="Estimated total containers"
                          value={`${containerResult.best?.estimatedContainers ?? 0}`}
                        />
                        <InfoRow
                          label="Orientation used"
                          value={containerResult.selectedCalc.orientation}
                        />
                        <InfoRow
                          label="Applied stack layers"
                          value={`${containerResult.selectedCalc.stackApplied}`}
                        />
                        <InfoRow
                          label="Total cargo volume"
                          value={`${parsed.totalItemVolumeM3.toFixed(3)} m³`}
                        />
                        <InfoRow
                          label="Total cargo weight"
                          value={`${parsed.totalWeightKg.toFixed(0)} kg`}
                        />
                      </div>
                    </div>

                    <AlertBox
                      title="Loading Constraints"
                      items={containerResult.alerts}
                    />
                  </div>
                )}
              </div>
            ) : (
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-semibold text-[#123b66]">
                      Inland Truck Planning Result
                    </h2>
                    <p className="mt-1 text-sm text-slate-600">
                      Template-based dispatch estimation for China domestic transport.
                    </p>
                  </div>

                  <span className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold text-[#123b66]">
                    Estimator v1
                  </span>
                </div>

                {!parsed.valid || !truckResult ? (
                  <EmptyState text="Please complete the core cargo fields to generate the planning result." />
                ) : (
                  <div className="mt-6 space-y-6">
                    <div className="grid gap-4 md:grid-cols-2">
                      <MetricCard
                        label="Selected truck"
                        value={truckResult.selectedSpec.label}
                      />
                      <MetricCard
                        label="Recommended truck"
                        value={truckResult.best?.type ?? "N/A"}
                      />
                      <MetricCard
                        label="Est. max units / truck"
                        value={`${truckResult.selectedUnits}`}
                      />
                      <MetricCard
                        label="Est. truck trips"
                        value={`${truckResult.requiredTrips}`}
                      />
                      <MetricCard
                        label="Volume utilization"
                        value={percent(truckResult.volumeUtil)}
                      />
                      <MetricCard
                        label="Weight utilization"
                        value={percent(truckResult.weightUtil)}
                      />
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                      <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                        Planning Detail
                      </h3>
                      <div className="mt-3 grid gap-3 text-sm text-slate-700">
                        <InfoRow
                          label="Best-fit truck"
                          value={truckResult.best?.type ?? "N/A"}
                        />
                        <InfoRow
                          label="Best-fit units per truck"
                          value={`${truckResult.best?.calc.unitsPerSpace ?? 0}`}
                        />
                        <InfoRow
                          label="Estimated total truck trips"
                          value={`${truckResult.best?.trips ?? 0}`}
                        />
                        <InfoRow
                          label="Orientation used"
                          value={truckResult.selectedCalc.orientation}
                        />
                        <InfoRow
                          label="Applied stack layers"
                          value={`${truckResult.selectedCalc.stackApplied}`}
                        />
                        <InfoRow
                          label="Common over-limit trigger"
                          value={
                            truckResult.riskFlags.length > 0 ? "Possible" : "Not indicated by current template"
                          }
                        />
                      </div>
                    </div>

                    <AlertBox
                      title="Transport Risk Reminders"
                      items={[...truckResult.riskFlags, ...truckResult.alerts]}
                    />
                  </div>
                )}
              </div>
            )}

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-[#123b66]">
                Product Notes
              </h2>
              <div className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
                <p>
                  <span className="font-semibold text-slate-800">Current logic:</span> template dimensions
                  + payload ceiling + orientation permission + max stacking layers.
                </p>
                <p>
                  <span className="font-semibold text-slate-800">Not included yet:</span> DG rules, route-specific
                  compliance engine, live China road restrictions, 3D placement simulation, and axle-by-axle distribution logic.
                </p>
                <p>
                  This makes the page suitable as a consulting-grade initial estimator, aligned with the current
                  RiskAtlas product maturity.
                </p>
              </div>

              <div className="mt-5">
                <Link
                  href="/riskatlas"
                  className="inline-flex items-center rounded-full bg-[#123b66] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#0f3153]"
                >
                  Explore RiskAtlas
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <label className="block">
      <div className="mb-2 text-sm font-medium text-slate-700">{label}</div>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#123b66] focus:ring-2 focus:ring-[#123b66]/10"
      />
    </label>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { label: string; value: string }[];
}) {
  return (
    <label className="block">
      <div className="mb-2 text-sm font-medium text-slate-700">{label}</div>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#123b66] focus:ring-2 focus:ring-[#123b66]/10"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </label>
  );
}

function ToggleField({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <label className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3">
      <span className="text-sm font-medium text-slate-700">{label}</span>
      <button
        type="button"
        onClick={() => onChange(!checked)}
        className={`relative h-7 w-12 rounded-full transition ${
          checked ? "bg-[#123b66]" : "bg-slate-300"
        }`}
      >
        <span
          className={`absolute top-1 h-5 w-5 rounded-full bg-white transition ${
            checked ? "left-6" : "left-1"
          }`}
        />
      </button>
    </label>
  );
}

function TextAreaField({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <div className="mb-2 text-sm font-medium text-slate-700">{label}</div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={4}
        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#123b66] focus:ring-2 focus:ring-[#123b66]/10"
      />
    </label>
  );
}

function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
      <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
        {label}
      </div>
      <div className="mt-2 text-xl font-semibold text-slate-900">{value}</div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-slate-200 pb-3 last:border-b-0 last:pb-0">
      <div className="text-slate-500">{label}</div>
      <div className="text-right font-medium text-slate-900">{value}</div>
    </div>
  );
}

function AlertBox({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
      <h3 className="text-sm font-semibold uppercase tracking-wide text-amber-800">
        {title}
      </h3>
      {items.length === 0 ? (
        <p className="mt-3 text-sm text-amber-900">
          No additional constraints triggered by the current input set.
        </p>
      ) : (
        <ul className="mt-3 space-y-2 text-sm leading-6 text-amber-900">
          {items.map((item, idx) => (
            <li key={`${item}-${idx}`} className="flex gap-2">
              <span>•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function EmptyState({ text }: { text: string }) {
  return (
    <div className="mt-6 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-sm text-slate-500">
      {text}
    </div>
  );
}
