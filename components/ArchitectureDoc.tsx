import React from 'react';
import { Server, Database, Smartphone, ShieldCheck, Zap } from 'lucide-react';

const ArchitectureDoc: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-sm">
      <div className="mb-8 border-b pb-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Hyperlocal Food Rescue Network</h1>
        <p className="text-gray-600">Product Architecture & Strategic Vision v1.0</p>
      </div>

      <div className="space-y-12">
        {/* Section 1: Vision */}
        <section>
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2 mb-4">
            <Zap className="text-amber-500" /> Product Vision & Value Prop
          </h2>
          <div className="prose text-gray-600">
            <p className="mb-2"><strong>Vision:</strong> Eliminate urban hunger by treating surplus food as a time-sensitive logistical asset rather than waste.</p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>For Donors:</strong> Zero-cost waste disposal, tax benefits (80G), CSR metrics.</li>
              <li><strong>For Recipients:</strong> Predictable, high-quality food supply for beneficiaries.</li>
              <li><strong>For Rescuers:</strong> Gig-economy income or volunteer gamification rewards.</li>
            </ul>
          </div>
        </section>

        {/* Section 2: Architecture */}
        <section>
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2 mb-4">
            <Server className="text-blue-500" /> Backend Architecture
          </h2>
          <div className="bg-slate-900 text-green-400 p-4 rounded-lg font-mono text-xs overflow-x-auto whitespace-pre">
            {`
[Client Layer]
   |--> Mobile App (React Native / PWA) -> Offline-first
   |--> Web Dashboard (React Admin)

[API Gateway / Load Balancer] (Nginx)
   |
   V
[Microservices Cluster] (Node.js/Go)
   |--> Auth Service (JWT, OAuth)
   |--> Logistics Engine (Geo-hashing, Matching Algorithm)
   |--> Food Safety AI (Gemini Flash integration)
   |--> Impact Ledger (Real-time analytics)

[Data Layer]
   |--> PostgreSQL (Users, Structured Donation Data)
   |--> Redis (Real-time location streams, Caching)
   |--> S3/Cloud Storage (Proof-of-delivery photos)

[AI & ML Pipeline]
   |--> Gemini API (Safety scoring, Unstructured text parsing)
   |--> Demand Prediction Model (Python/TensorFlow Lite)
`}
          </div>
        </section>

        {/* Section 3: AI Models */}
        <section>
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2 mb-4">
            <Smartphone className="text-purple-500" /> AI Systems Design
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="border p-4 rounded-lg">
              <h3 className="font-bold text-gray-800 mb-2">Matching Algorithm</h3>
              <p className="text-sm text-gray-600">
                Uses a multi-objective cost function considering:
                <br />1. Distance (Euclidean & Route)
                <br />2. Perishability (Time-to-expiry)
                <br />3. Rescuer Capacity vs Donation Size
                <br />4. Recipient Need/Capacity Score
              </p>
            </div>
            <div className="border p-4 rounded-lg">
              <h3 className="font-bold text-gray-800 mb-2">Safety Scoring (Gemini)</h3>
              <p className="text-sm text-gray-600">
                Analyzes food description, prep time, and environmental tags (e.g., "contains dairy", "room temp") to generate a risk score (0-100). Low scores trigger manual audit.
              </p>
            </div>
          </div>
        </section>

        {/* Section 4: Legal & Safety */}
        <section>
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2 mb-4">
            <ShieldCheck className="text-emerald-500" /> Legal & Compliance
          </h2>
          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
            <h3 className="font-bold text-yellow-800">Good Samaritan Strategy</h3>
            <ul className="list-disc pl-5 mt-2 text-sm text-yellow-800">
              <li><strong>Liability Waiver:</strong> Digital signature required by recipient upon pickup acknowledging food condition.</li>
              <li><strong>Traceability:</strong> Blockchain-lite hash of every handover (Donor -&gt; Rescuer -&gt; Recipient).</li>
              <li><strong>Temperature Logs:</strong> Rescuer app prompts for rudimentary checks (e.g., "Is container warm?") before acceptance.</li>
            </ul>
          </div>
        </section>

        {/* Section 5: Pilot Strategy */}
        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Pilot Launch: Bangalore/Mumbai</h2>
          <p className="text-gray-600 text-sm mb-4">Focus on high-density tech hubs with existing gig-economy culture.</p>
          <div className="grid grid-cols-3 gap-2 text-center text-sm">
            <div className="bg-gray-100 p-2 rounded">
              <span className="block font-bold">Week 1-4</span>
              Onboard 50 NGOs & 20 Bakeries
            </div>
            <div className="bg-gray-100 p-2 rounded">
              <span className="block font-bold">Week 5-8</span>
              Closed Beta with 100 Volunteer Rescuers
            </div>
            <div className="bg-gray-100 p-2 rounded">
              <span className="block font-bold">Month 3</span>
              Public Launch + Corporate Cafeterias
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ArchitectureDoc;