/* ==========================================================================
   PERMIT TO WORK INSPECTION — CORE APPLICATION LOGIC
   ========================================================================== */

// ==========================================
// 1. CHECKLIST DEFINITIONS (5 หมวด 18 ข้อ)
// ==========================================
const CHECKLIST_DEFINITIONS = [
  {
    id: 'pta',
    title: 'หมวดที่ 1: การขออนุญาตทำงานและการอนุมัติ',
    icon: 'file-check',
    items: [
      { id: 'A1', text: 'ใบอนุญาตทำงานหลักและใบอนุญาตทำงานเฉพาะ ถูกขออนุญาตอย่างถูกต้อง และอยู่ในช่วงเวลาที่ขออนุญาตไว้' },
      { id: 'A2', text: 'มีการระบุรายละเอียดงาน พื้นที่ อุปกรณ์ และเครื่องมือที่ใช้งานถูกระบุไว้อย่างครบถ้วน' },
      { id: 'A3', text: 'มีการแนบเอกสารประกอบการขออนุญาตทำงานครบถ้วน เช่น JSA, เอกสารรับรองการผ่านอบรมตามกฎหมายกำหนด' },
    ]
  },
  {
    id: 'raa',
    title: 'หมวดที่ 2: การประเมินความเสี่ยงและการกำหนดมาตรการป้องกัน',
    icon: 'alert-triangle',
    items: [
      { id: 'B1', text: 'อันตรายทั้งหมดที่เกี่ยวข้องกับงาน อุปกรณ์ และสภาพแวดล้อม ถูกประเมินและระบุใน JSA อย่างครบถ้วน' },
      { id: 'B2', text: 'มีการกำหนดมาตรการป้องกันที่เพียงพอต่อความเสี่ยง และระบุใน JSA อย่างชัดเจน และผู้ปฏิบัติงานปฏิบัติตามครบถ้วน' },
    ]
  },
  {
    id: 'iso',
    title: 'หมวดที่ 3: การตัดแยกระบบ',
    icon: 'zap-off',
    items: [
      { id: 'C1', text: 'ดำเนินการตัดแยกพลังงานและสารอันตรายตามขั้นตอนครบถ้วน (เช่น Isolating blinds, ปิดสวิตช์เบรกเกอร์, ตัดการเชื่อมต่อของท่อ)' },
      { id: 'C2', text: 'มีการติดป้าย Lockout-Tagout, Isolation Tag เพื่อป้องกันการใช้งาน เปิด ปิด หรือเคลื่อนย้ายอุปกรณ์โดยไม่ได้รับอนุญาต' },
      { id: 'C3', text: 'การตัดแยกที่ดำเนินการเพียงพอและปลอดภัยต่อการทำงาน และสอดคล้องกับใบอนุญาตทำงานที่เกี่ยวข้อง' },
    ]
  },
  {
    id: 'pre',
    title: 'หมวดที่ 4: การตรวจสอบก่อนเริ่มงาน การต่ออายุ และการปฏิบัติงาน',
    icon: 'clipboard-list',
    items: [
      { id: 'D1', text: 'มีการสื่อสารขอบเขตของงาน อันตราย การปฏิบัติกรณีเกิดเหตุฉุกเฉิน และมาตรการไปยังผู้ปฏิบัติงานทุกคนให้เข้าใจ' },
      { id: 'D2', text: 'ผู้ปฏิบัติงานที่มีคุณสมบัติเพิ่มเติม เช่น ผู้ปฏิบัติงานในอับอากาศ, ผู้ใช้งานปั้นจั่น ผ่านการอบรมตามที่กฎหมายกำหนด' },
      { id: 'D3', text: 'ผู้ปฏิบัติงานทุกคนมีการปฏิบัติงานเป็นไปตามมาตรการที่ระบุในใบอนุญาตทำงาน, JSA และกฎความปลอดภัยที่เกี่ยวข้อง' },
      { id: 'D4', text: 'เครื่องมือและอุปกรณ์ทั้งหมด อยู่ในสภาพปลอดภัย และได้รับการตรวจสอบตามระยะเวลาที่กำหนด' },
      { id: 'D5', text: 'อุปกรณ์ PPE ที่ใช้งานเพียงพอต่อความเสี่ยงในการปฏิบัติงาน และอยู่ในสภาพที่พร้อมใช้งาน' },
      { id: 'D6', text: 'มีผู้ปฏิบัติงานที่เกี่ยวข้องอยู่ประจำหน้างานตลอดเวลา เช่น เจ้าหน้าที่ความปลอดภัย หรือผู้เฝ้าระวังในที่อับอากาศ' },
      { id: 'D7', text: 'มีการตรวจสอบให้ปฏิบัติตามข้อพึงปฏิบัติโดยผู้ควบคุมงาน และผู้ตรวจสอบก่อนเริ่มงาน' },
      { id: 'D8', text: 'มีการตรวจวัดก๊าซ หรือสภาพบรรยากาศอันตราย ก่อนเริ่มงาน และระหว่างปฏิบัติงาน พร้อมบันทึกผลลงในแบบฟอร์ม' },
    ]
  },
  {
    id: 'cls',
    title: 'หมวดที่ 5: การปิดใบอนุญาตทำงาน และการส่งคืนพื้นที่',
    icon: 'check-circle',
    items: [
      { id: 'E1', text: 'วัสดุ อุปกรณ์ และของเสียที่ไม่ได้ถูกใช้งาน ถูกนำออกจากพื้นที่ หรือจัดเก็บอย่างเหมาะสม' },
      { id: 'E2', text: 'ใบอนุญาตทำงาน และเอกสารแนบทั้งหมดถูกนำไปปิดกับผู้ตรวจสอบและผู้อนุญาตอย่างถูกต้องหลังเลิกปฏิบัติงาน' },
    ]
  }
];

// ==========================================
// 2. CONSTANTS & BASELINE DATA
// ==========================================
const DEFECT_TARGET = 0.19;
const INSPECT_TARGET_PERCENT = 10;
const FIXED_TARGET_COUNT = 40;

const BASELINE_OVERALL = [
  { month: 'Nov', total: 6925, inspect: 1037 },
  { month: 'Dec', total: 5863, inspect: 1216 },
  { month: 'Jan', total: 5931, inspect: 950 },
  { month: 'Feb', total: 6272, inspect: 1001 },
  { month: 'Mar', total: 6907, inspect: 1050 },
];

const BASELINE_DEFECTS = [
  { month: 'Nov', defectCount: 0 },
  { month: 'Dec', defectCount: 1 },
  { month: 'Jan', defectCount: 0 },
  { month: 'Feb', defectCount: 1 },
  { month: 'Mar', defectCount: 1 },
];

// Auditor dept baseline (15 departments — used for Chart 3)
const BASELINE_AREA_PERCENTAGES = {
  // ข้อมูลจากภาพ (Nov: Total GSP 1037 ใบ = 172.8%)
  Nov: [
    { area: 'GSP#1 Process (ปผ.)', percentage: 137.5 },
    { area: 'GSP#1 Utility (ปผ.)', percentage: 182.5 },
    { area: 'GSP#2 (ปผ.)',         percentage: 315.0 },
    { area: 'GSP#3 (ปผ.)',         percentage: 155.0 },
    { area: 'ESP (ปอ.)',           percentage: 180.0 },
    { area: 'GSP#5 (ปต.)',         percentage: 187.5 },
    { area: 'GSP#6 (ปล.)',         percentage: 157.5 },
    { area: 'Tank Farm & CWWTP (คธ.)', percentage: 207.5 },
    { area: 'GPPP (ปก.)',          percentage: 127.5 },
    { area: 'บง.วบก.',             percentage: 105.0 },
    { area: 'บค.วบก.',             percentage: 212.5 },
    { area: 'บฟ.วบก.',             percentage: 120.0 },
    { area: 'วก.วบก.',             percentage: 245.0 },
    { area: 'ตร.วบก.',             percentage: 142.5 },
    { area: 'ปภ.ผยก.',             percentage: 117.5 },
  ],
  // ข้อมูลจากภาพ (Dec: Total GSP 1216 ใบ = 202.7%)
  Dec: [
    { area: 'GSP#1 Process (ปผ.)', percentage: 120.0 },
    { area: 'GSP#1 Utility (ปผ.)', percentage: 140.0 },
    { area: 'GSP#2 (ปผ.)',         percentage: 155.0 },
    { area: 'GSP#3 (ปผ.)',         percentage: 187.5 },
    { area: 'ESP (ปอ.)',           percentage: 182.5 },
    { area: 'GSP#5 (ปต.)',         percentage: 215.0 },
    { area: 'GSP#6 (ปล.)',         percentage: 207.5 },
    { area: 'Tank Farm & CWWTP (คธ.)', percentage: 215.0 },
    { area: 'GPPP (ปก.)',          percentage: 185.0 },
    { area: 'บง.วบก.',             percentage: 195.0 },
    { area: 'บค.วบก.',             percentage: 272.5 },
    { area: 'บฟ.วบก.',             percentage: 130.0 },
    { area: 'วก.วบก.',             percentage: 507.5 },
    { area: 'ตร.วบก.',             percentage: 215.0 },
    { area: 'ปภ.ผยก.',             percentage: 112.5 },
  ],
  Jan: [
    { area: 'GSP#1 Process (ปผ.)', percentage: 108 }, { area: 'GSP#1 Utility (ปผ.)', percentage: 113 },
    { area: 'GSP#2 (ปผ.)', percentage: 145 }, { area: 'GSP#3 (ปผ.)', percentage: 295 },
    { area: 'ESP (ปอ.)', percentage: 123 }, { area: 'GSP#5 (ปต.)', percentage: 140 },
    { area: 'GSP#6 (ปล.)', percentage: 180 }, { area: 'Tank Farm & CWWTP (คธ.)', percentage: 260 },
    { area: 'GPPP (ปก.)', percentage: 148 }, { area: 'บง.วบก.', percentage: 150 },
    { area: 'บค.วบก.', percentage: 148 }, { area: 'บฟ.วบก.', percentage: 110 },
    { area: 'วก.วบก.', percentage: 218 }, { area: 'ตร.วบก.', percentage: 135 },
    { area: 'ปภ.ผยก.', percentage: 105 },
  ],
  Feb: [
    { area: 'GSP#1 Process (ปผ.)', percentage: 170 }, { area: 'GSP#1 Utility (ปผ.)', percentage: 103 },
    { area: 'GSP#2 (ปผ.)', percentage: 150 }, { area: 'GSP#3 (ปผ.)', percentage: 140 },
    { area: 'ESP (ปอ.)', percentage: 140 }, { area: 'GSP#5 (ปต.)', percentage: 170 },
    { area: 'GSP#6 (ปล.)', percentage: 105 }, { area: 'Tank Farm & CWWTP (คธ.)', percentage: 338 },
    { area: 'GPPP (ปก.)', percentage: 275 }, { area: 'บง.วบก.', percentage: 105 },
    { area: 'บค.วบก.', percentage: 205 }, { area: 'บฟ.วบก.', percentage: 113 },
    { area: 'วก.วบก.', percentage: 230 }, { area: 'ตร.วบก.', percentage: 150 },
    { area: 'ปภ.ผยก.', percentage: 110 },
  ],
  Mar: [
    { area: 'GSP#1 Process (ปผ.)', percentage: 158 }, { area: 'GSP#1 Utility (ปผ.)', percentage: 165 },
    { area: 'GSP#2 (ปผ.)', percentage: 140 }, { area: 'GSP#3 (ปผ.)', percentage: 273 },
    { area: 'ESP (ปอ.)', percentage: 163 }, { area: 'GSP#5 (ปต.)', percentage: 238 },
    { area: 'GSP#6 (ปล.)', percentage: 130 }, { area: 'Tank Farm & CWWTP (คธ.)', percentage: 153 },
    { area: 'GPPP (ปก.)', percentage: 268 }, { area: 'บง.วบก.', percentage: 128 },
    { area: 'บค.วบก.', percentage: 210 }, { area: 'บฟ.วบก.', percentage: 105 },
    { area: 'วก.วบก.', percentage: 275 }, { area: 'ตร.วบก.', percentage: 120 },
    { area: 'ปภ.ผยก.', percentage: 103 },
  ],
  // ข้อมูลจากภาพ (Apr: Total GSP 921 ใบ = 154%)
  Apr: [
    { area: 'GSP#1 Process (ปผ.)', percentage: 125 },
    { area: 'GSP#1 Utility (ปผ.)', percentage: 158 },
    { area: 'GSP#2 (ปผ.)',         percentage: 138 },
    { area: 'GSP#3 (ปผ.)',         percentage: 198 },
    { area: 'ESP (ปอ.)',           percentage: 128 },
    { area: 'GSP#5 (ปต.)',         percentage: 173 },
    { area: 'GSP#6 (ปล.)',         percentage: 213 },
    { area: 'Tank Farm & CWWTP (คธ.)', percentage: 195 },
    { area: 'GPPP (ปก.)',          percentage: 208 },
    { area: 'บง.วบก.',             percentage: 105 },
    { area: 'บค.วบก.',             percentage: 155 },
    { area: 'บฟ.วบก.',             percentage: 125 },
    { area: 'วก.วบก.',             percentage: 175 },
    { area: 'ตร.วบก.',             percentage: 105 },
    { area: 'ปภ.ผยก.',             percentage: 105 },
  ],
  // ข้อมูลจากภาพ (May: Total GSP 1020 ใบ = 170%)
  May: [
    { area: 'GSP#1 Process (ปผ.)', percentage: 165 },
    { area: 'GSP#1 Utility (ปผ.)', percentage: 113 },
    { area: 'GSP#2 (ปผ.)',         percentage: 183 },
    { area: 'GSP#3 (ปผ.)',         percentage: 260 },
    { area: 'ESP (ปอ.)',           percentage: 160 },
    { area: 'GSP#5 (ปต.)',         percentage: 175 },
    { area: 'GSP#6 (ปล.)',         percentage: 245 },
    { area: 'Tank Farm & CWWTP (คธ.)', percentage: 203 },
    { area: 'GPPP (ปก.)',          percentage: 150 },
    { area: 'บง.วบก.',             percentage: 133 },
    { area: 'บค.วบก.',             percentage: 168 },
    { area: 'บฟ.วบก.',             percentage: 115 },
    { area: 'วก.วบก.',             percentage: 240 },
    { area: 'ตร.วบก.',             percentage: 143 },
    { area: 'ปภ.ผยก.',             percentage: 100 },
  ],
  // ข้อมูลจากตาราง (Jun)
  Jun: [
    { area: 'GSP#1 Process (ปผ.)', percentage: 110.0 },
    { area: 'GSP#1 Utility (ปผ.)', percentage: 192.5 },
    { area: 'GSP#2 (ปผ.)',         percentage: 290.0 },
    { area: 'GSP#3 (ปผ.)',         percentage: 162.5 },
    { area: 'ESP (ปอ.)',           percentage: 200.0 },
    { area: 'GSP#5 (ปต.)',         percentage: 167.5 },
    { area: 'GSP#6 (ปล.)',         percentage: 162.5 },
    { area: 'Tank Farm & CWWTP (คธ.)', percentage: 202.5 },
    { area: 'GPPP (ปก.)',          percentage: 205.0 },
    { area: 'บง.วบก.',             percentage: 95.0 },
    { area: 'บค.วบก.',             percentage: 195.0 },
    { area: 'บฟ.วบก.',             percentage: 122.5 },
    { area: 'วก.วบก.',             percentage: 235.0 },
    { area: 'ตร.วบก.',             percentage: 112.5 },
    { area: 'ปภ.ผยก.',             percentage: 102.5 },
  ]
};

// Work areas (11 items — used for Chart 4)
const WORK_AREAS = ['GSP#1', 'GSP#2', 'GSP#3', 'ESP', 'GSP#5', 'GSP#6', 'GPPP', 'Tank Farm', 'CWWTP', 'Lab', 'คลังสารเคมี'];

// Baseline data for Work Area chart (จากรูปภาพ)
const BASELINE_WORK_AREA_COUNTS = {
  Nov: [160, 137, 93, 115, 153, 61, 158, 92, 21, 0, 0],
  Dec: [125, 81, 116, 117, 130, 45, 159, 104, 24, 0, 0],
  Jan: [126, 69, 190, 92, 110, 113, 119, 110, 39, 0, 0],
  Feb: [142, 74, 127, 93, 131, 94, 207, 112, 29, 0, 0],
  Mar: [170, 74, 136, 101, 142, 105, 229, 90, 17, 0, 0],
  Apr: [135, 72, 110, 80, 109, 142, 153, 101, 17, 0, 0],
  May: [100, 91, 129, 111, 110, 169, 175, 100, 21, 0, 0],
  Jun: [163, 20, 88, 115, 106, 123, 179, 173, 17, 0, 0]
};

// ==========================================
// 3A. EDITABLE BASELINE (Dashboard Monthly Data)
// ==========================================
const DEFAULT_BASELINE = [
  { month: 'Nov', label: 'พ.ย. 68', total: 6925, inspect: 1037, defect: 0 },
  { month: 'Dec', label: 'ธ.ค. 68', total: 5863, inspect: 1216, defect: 1 },
  { month: 'Jan', label: 'ม.ค. 69', total: 5931, inspect: 950,  defect: 0 },
  { month: 'Feb', label: 'ก.พ. 69', total: 6272, inspect: 1001, defect: 1 },
  { month: 'Mar', label: 'มี.ค. 69', total: 6907, inspect: 1050, defect: 1 },
  { month: 'Apr', label: 'เม.ย. 69', total: 0, inspect: 0, defect: 0 },
  { month: 'May', label: 'พ.ค. 69', total: 0, inspect: 0, defect: 0 },
  { month: 'Jun', label: 'มิ.ย. 69', total: 0, inspect: 0, defect: 0 },
  { month: 'Jul', label: 'ก.ค. 69', total: 0, inspect: 0, defect: 0 },
  { month: 'Aug', label: 'ส.ค. 69', total: 0, inspect: 0, defect: 0 },
  { month: 'Sep', label: 'ก.ย. 69', total: 0, inspect: 0, defect: 0 },
  { month: 'Oct', label: 'ต.ค. 69', total: 0, inspect: 0, defect: 0 },
];
let editableBaseline = DEFAULT_BASELINE.map(b => ({...b}));

// ==========================================
// 3. GLOBAL STATE
// ==========================================
let auditsDatabase = [];
let selectedMonth = 'Jan';
let selectedWorkAreaMonth = 'all';
let pendingFiles = [];
let charts = {
  composed: null,
  defect: null,
  auditorDept: null,
  workArea: null
};

// ==========================================
// ==========================================
// 4. INITIALIZATION & FIREBASE
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  // Real-time listener for Firestore
  try {
    db.collection('audits').orderBy('date', 'desc').onSnapshot((snapshot) => {
      const newAudits = [];
      snapshot.forEach(doc => {
        newAudits.push({ id: doc.id, ...doc.data() });
      });
      auditsDatabase = newAudits;
      
      applyFilters();
      updateDashboard();
    }, (error) => {
      console.error('Error fetching real-time data:', error);
      showToast('ไม่สามารถเชื่อมต่อฐานข้อมูลได้', 'error');
    });
  } catch (error) {
    console.error('Firebase Initialization failed:', error);
  }

  // Load editable baseline from localStorage
  const savedBaseline = localStorage.getItem('ptw_baseline_settings');
  if (savedBaseline) {
    try {
      const parsed = JSON.parse(savedBaseline);
      // Merge: keep DEFAULT_BASELINE structure, overlay saved values
      editableBaseline = DEFAULT_BASELINE.map(def => {
        const saved = parsed.find(p => p.month === def.month);
        return saved ? { ...def, ...saved } : { ...def };
      });
    } catch(e) {
      editableBaseline = DEFAULT_BASELINE.map(b => ({...b}));
    }
  }

  setDefaultDateTime();
  renderChecklistForm();
  lucide.createIcons();
  applyFilters();
  updateDashboard();
  initSafetySection();
});

function setDefaultDateTime() {
  const dateInput = document.getElementById('input-date');
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  dateInput.value = `${year}-${month}-${day}`;

  const options = { day: 'numeric', month: 'short', year: 'numeric' };
  document.getElementById('header-date-text').textContent = 'วันที่ ' + now.toLocaleDateString('th-TH', options);
}

// ==========================================
// 5. DYNAMIC CHECKLIST RENDERING
// ==========================================
function renderChecklistForm() {
  const container = document.getElementById('dynamic-checklist-container');
  container.innerHTML = '';

  CHECKLIST_DEFINITIONS.forEach(category => {
    const card = document.createElement('div');
    card.className = 'card checklist-category-card';

    const title = document.createElement('h3');
    title.className = 'checklist-category-header';
    title.innerHTML = `<i data-lucide="${category.icon}"></i> <span>${category.title}</span>`;
    card.appendChild(title);

    const listContainer = document.createElement('div');
    listContainer.className = 'checklist-container';

    category.items.forEach(item => {
      const row = document.createElement('div');
      row.className = 'checklist-row';
      row.innerHTML = `
        <div class="question-info">
          <div class="question-text">${item.id}. ${item.text}</div>
        </div>
        <div class="segmented-control" role="radiogroup" aria-label="${item.text}">
          <input type="radio" id="radio-${item.id}-pass" name="chk-${item.id}" value="pass" checked class="control-pass">
          <label for="radio-${item.id}-pass">สอดคล้อง</label>

          <input type="radio" id="radio-${item.id}-fail" name="chk-${item.id}" value="fail" class="control-fail">
          <label for="radio-${item.id}-fail">ไม่สอดคล้อง</label>

          <input type="radio" id="radio-${item.id}-na" name="chk-${item.id}" value="na" class="control-na">
          <label for="radio-${item.id}-na">N/A</label>
        </div>
      `;
      listContainer.appendChild(row);
    });

    card.appendChild(listContainer);
    container.appendChild(card);
  });
}

// ==========================================
// 6. FILE UPLOAD HANDLING
// ==========================================
function handleFileSelect(event) {
  const files = Array.from(event.target.files);
  const MAX_SIZE = 10 * 1024 * 1024; // 10MB

  files.forEach(file => {
    if (file.type.startsWith('image/')) {
      // Compress image for mobile
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_WIDTH = 1024;
          const MAX_HEIGHT = 1024;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);
          
          const dataUrl = canvas.toDataURL('image/jpeg', 0.6);
          const estSize = Math.round((dataUrl.length * 3) / 4);
          
          pendingFiles.push({ name: file.name, type: 'image/jpeg', size: estSize, data: dataUrl });
          renderFilePreviews();
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    } else {
      if (file.size > MAX_SIZE) {
        showToast(`ไฟล์ "${file.name}" มีขนาดเกิน 10MB`, 'error');
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        pendingFiles.push({ name: file.name, type: file.type, size: file.size, data: e.target.result });
        renderFilePreviews();
      };
      reader.readAsDataURL(file);
    }
  });
  event.target.value = '';
}

function renderFilePreviews() {
  const container = document.getElementById('file-preview-list');
  container.innerHTML = '';

  pendingFiles.forEach((file, index) => {
    const item = document.createElement('div');
    item.className = 'file-preview-item';
    const sizeKB = (file.size / 1024).toFixed(1);
    const isImage = file.type.startsWith('image/');
    item.innerHTML = `
      <div style="display: flex; align-items: center; gap: 10px; flex: 1; min-width: 0;">
        <i data-lucide="${isImage ? 'image' : 'file-text'}" style="width: 18px; height: 18px; color: var(--primary); flex-shrink: 0;"></i>
        <div style="min-width: 0;">
          <div style="font-weight: 600; font-size: 0.85rem; color: var(--text-headings); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${file.name}</div>
          <div style="font-size: 0.75rem; color: var(--text-muted);">${sizeKB} KB</div>
        </div>
      </div>
      <button type="button" onclick="removeFile(${index})" style="background: none; border: none; cursor: pointer; color: var(--danger); padding: 4px; flex-shrink: 0;">
        <i data-lucide="x-circle" style="width: 18px; height: 18px;"></i>
      </button>
    `;
    container.appendChild(item);
  });

  lucide.createIcons();
}

function removeFile(index) {
  pendingFiles.splice(index, 1);
  renderFilePreviews();
}

// ==========================================
// 7. NAVIGATION TAB SWITCHER
// ==========================================
function switchTab(tabId) {
  document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
  const activeNavItem = document.getElementById(`nav-${tabId}`);
  if (activeNavItem) activeNavItem.classList.add('active');

  document.querySelectorAll('.content-section').forEach(section => section.classList.remove('active'));
  const activeSection = document.getElementById(`section-${tabId}`);
  if (activeSection) activeSection.classList.add('active');

  if (tabId === 'dashboard') updateDashboard();
  else if (tabId === 'history') applyFilters();

  const headingText = document.getElementById('heading-text');
  if (headingText) {
    if (tabId === 'dashboard') headingText.textContent = 'Permit to Work Inspection Dashboard';
    else if (tabId === 'safety') headingText.textContent = 'Safety Information';
    else headingText.textContent = 'Permit to Work Inspection';
  }

  const headerLegend = document.getElementById('header-target-legend');
  if (headerLegend) {
    headerLegend.style.display = (tabId === 'dashboard') ? 'flex' : 'none';
  }
}

function changeSelectedMonth(month) {
  selectedMonth = month;
  const allMonths = ['Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'];
  allMonths.forEach(m => {
    const btn = document.getElementById(`btn-month-${m}`);
    if (btn) btn.classList.remove('active');
  });
  const activeBtn = document.getElementById(`btn-month-${month}`);
  if (activeBtn) activeBtn.classList.add('active');

  const monthThai = { Nov:'พ.ย.', Dec:'ธ.ค.', Jan:'ม.ค.', Feb:'ก.พ.', Mar:'มี.ค.', Apr:'เม.ย.', May:'พ.ค.', Jun:'มิ.ย.', Jul:'ก.ค.', Aug:'ส.ค.', Sep:'ก.ย.', Oct:'ต.ค.' };
  const subtitle = document.getElementById('auditor-chart-subtitle');
  if (subtitle) subtitle.textContent = `ข้อมูลประจำเดือน ${monthThai[month] || month} | เป้าหมายมาตรฐาน 40 ใบ/หน่วยงาน/เดือน`;

  updateAuditorDeptChart();
}

// ==========================================
// SAFETY INFORMATION LOGIC
// ==========================================
let safetyItems = JSON.parse(localStorage.getItem('safety_items_v2')) || [];
const savedSafetyTitle = localStorage.getItem('safety_title_v2');

// Dynamic Categories
const defaultSafetyCategories = [
  { id: 'general', name: 'ประกาศทั่วไป' },
  { id: 'rules', name: 'กฎระเบียบความปลอดภัย' },
  { id: 'incidents', name: 'รายงานอุบัติการณ์' },
  { id: 'training', name: 'อบรม/กิจกรรม' }
];
let safetyCategories = JSON.parse(localStorage.getItem('safety_categories_v2')) || defaultSafetyCategories;
let currentSafetyCategory = 'all';

function initSafetySection() {
  const titleEl = document.getElementById('safety-main-title');
  if (titleEl && savedSafetyTitle) titleEl.textContent = savedSafetyTitle;
  
  // Ensure existing items have a category
  safetyItems.forEach(item => {
    if (!item.category) item.category = 'general';
  });
  
  renderSafetyCategoryTabs();
  renderSafetyItems();
}

function renderSafetyCategoryTabs() {
  const container = document.getElementById('safety-category-tabs-container');
  const selectEl = document.getElementById('pr-category');
  if (!container || !selectEl) return;

  // Build Tabs HTML
  let tabsHtml = `<button class="btn ${currentSafetyCategory === 'all' ? 'btn-primary' : 'btn-outline'} btn-sm" onclick="filterSafetyCategory('all')" id="tab-cat-all" style="border-radius: 50px; ${currentSafetyCategory === 'all' ? '' : 'border-color: transparent;'}">ทั้งหมด</button>`;
  
  safetyCategories.forEach(cat => {
    const isActive = currentSafetyCategory === cat.id;
    tabsHtml += `<button class="btn ${isActive ? 'btn-primary' : 'btn-outline'} btn-sm" onclick="filterSafetyCategory('${cat.id}')" id="tab-cat-${cat.id}" style="border-radius: 50px; ${isActive ? '' : 'border-color: transparent;'}">${cat.name}</button>`;
  });
  container.innerHTML = tabsHtml;

  // Build Select Options
  selectEl.innerHTML = safetyCategories.map(cat => `<option value="${cat.id}">${cat.name}</option>`).join('');
}

function filterSafetyCategory(cat) {
  currentSafetyCategory = cat;
  renderSafetyCategoryTabs();
  renderSafetyItems();
}

function editSafetyTitle() {
  const titleEl = document.getElementById('safety-main-title');
  const currentTitle = titleEl.textContent;
  const newTitle = prompt("กรุณาระบุชื่อหัวข้อที่ต้องการ:", currentTitle);
  if (newTitle && newTitle.trim() !== '') {
    titleEl.textContent = newTitle;
    localStorage.setItem('safety_title_v2', newTitle);
    showToast('เปลี่ยนชื่อหัวข้อเรียบร้อย', 'success');
  }
}

function renderSafetyItems() {
  const container = document.getElementById('safety-content-container');
  const emptyState = document.getElementById('safety-empty-state');
  if (!container || !emptyState) return;

  const filteredItems = currentSafetyCategory === 'all' 
    ? safetyItems 
    : safetyItems.filter(item => item.category === currentSafetyCategory);

  if (filteredItems.length === 0) {
    emptyState.style.display = 'flex';
    container.innerHTML = '';
    return;
  }

  // Create lookup for names
  const categoryNames = {};
  safetyCategories.forEach(cat => { categoryNames[cat.id] = cat.name; });

  emptyState.style.display = 'none';
  container.innerHTML = filteredItems.map(item => {
    let contentHtml = '';
    if (item.type === 'link') {
      if (item.coverImg) {
        contentHtml = `
          <div style="width: 100%; display: flex; flex-direction: column; align-items: center; gap: 12px;">
            <div style="position: relative; width: 100%; cursor: pointer;" onclick="window.open('${item.src}', '_blank')">
              <img src="${item.coverImg}" style="width: 100%; max-height: 600px; object-fit: contain; border-radius: var(--radius-md); border: 1px solid var(--border-color); box-shadow: var(--shadow-sm);" alt="Link Cover">
              <div style="position: absolute; bottom: 16px; right: 16px; background: rgba(255,255,255,0.95); color: var(--primary); padding: 8px 16px; border-radius: 50px; font-weight: 700; display: flex; align-items: center; gap: 8px; box-shadow: var(--shadow-md);">
                <i data-lucide="external-link" style="width: 18px; height: 18px;"></i> เปิดเอกสาร
              </div>
            </div>
            <div style="padding: 12px; text-align: center; width: 100%;">
              <a href="${item.src}" target="_blank" class="btn btn-outline btn-sm" style="display: inline-flex; text-decoration: none; color: var(--primary); border-color: var(--primary);">
                <i data-lucide="external-link" style="width:16px;height:16px;margin-right:6px;"></i> เปิดเอกสารในหน้าต่างใหม่
              </a>
            </div>
          </div>
        `;
      } else {
        contentHtml = `
          <div style="width: 100%; display: flex; flex-direction: column; align-items: center; gap: 12px;">
            <div style="width: 100%; height: 350px; background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); border-radius: var(--radius-md); display: flex; flex-direction: column; align-items: center; justify-content: center; border: 1px dashed var(--primary); cursor: pointer; transition: transform 0.2s;" onclick="window.open('${item.src}', '_blank')" onmouseover="this.style.transform='scale(1.01)'" onmouseout="this.style.transform='scale(1)'">
               <i data-lucide="link" style="width: 64px; height: 64px; color: var(--primary); opacity: 0.8; margin-bottom: 16px;"></i>
               <h3 style="color: var(--primary-hover); margin-bottom: 8px; font-weight: 800;">เอกสารแนบ / Canva Site</h3>
               <p style="color: var(--text-muted); font-size: 0.85rem; max-width: 80%; text-align: center; word-break: break-all;">${item.src}</p>
               <div style="margin-top: 24px; background: #ffffff; color: var(--primary); padding: 8px 24px; border-radius: 50px; font-weight: 700; display: flex; align-items: center; gap: 8px; box-shadow: var(--shadow-sm);">
                  <i data-lucide="external-link" style="width: 18px; height: 18px;"></i> คลิกเพื่อเปิดอ่าน
               </div>
            </div>
          </div>
        `;
      }
    } else if (item.type === 'image') {
      contentHtml = `<img src="${item.src}" style="width: 100%; max-height: 800px; object-fit: contain; border-radius: var(--radius-md);" alt="Safety PR">`;
    }

    const catName = categoryNames[item.category] || 'ทั่วไป';

    return `
      <div style="min-width: 100%; scroll-snap-align: center; background: #ffffff; border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 16px; position: relative; box-shadow: var(--shadow-sm); flex-shrink: 0;">
        <div style="position: absolute; top: 16px; left: 16px; background: rgba(59, 130, 246, 0.1); color: var(--primary); padding: 4px 12px; border-radius: 50px; font-size: 0.75rem; font-weight: 800; z-index: 5; border: 1px solid rgba(59,130,246,0.2);">
          ${catName}
        </div>
        <button onclick="removeSafetyItem('${item.id}')" style="position: absolute; top: 16px; right: 16px; background: #ef4444; color: white; border: none; border-radius: 50%; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; cursor: pointer; z-index: 10; box-shadow: 0 2px 4px rgba(239, 68, 68, 0.3);" title="ลบข้อมูลนี้">
          <i data-lucide="trash-2" style="width: 16px; height: 16px;"></i>
        </button>
        <div style="margin-top: 36px; display: flex; justify-content: center; background: #f8fafc; border-radius: var(--radius-sm); padding: 10px;">
          ${contentHtml}
        </div>
      </div>
    `;
  }).join('');
  lucide.createIcons();
}

function removeSafetyItem(id) {
  if (confirm('คุณต้องการลบข้อมูลประชาสัมพันธ์นี้ใช่หรือไม่?')) {
    safetyItems = safetyItems.filter(item => item.id !== id);
    saveSafetyItems();
    renderSafetyItems();
    showToast('ลบข้อมูลเรียบร้อย', 'success');
  }
}

function scrollSafety(direction) {
  const container = document.getElementById('safety-content-container');
  if (container) {
    // Scroll amount is container width + gap
    const scrollAmount = container.clientWidth + 24; 
    container.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' });
  }
}

function openPrModal() {
  document.getElementById('add-pr-modal').classList.add('active');
  document.getElementById('pr-file-input').value = '';
  document.getElementById('pr-url-input').value = '';
  const coverInput = document.getElementById('pr-link-cover-input');
  if(coverInput) coverInput.value = '';
}

function closePrModal(e) {
  if (e && e.target !== document.getElementById('add-pr-modal')) return;
  document.getElementById('add-pr-modal').classList.remove('active');
}

function togglePrType() {
  const type = document.getElementById('pr-type').value;
  document.getElementById('pr-input-image').style.display = type === 'image' ? 'block' : 'none';
  document.getElementById('pr-input-link').style.display = type === 'link' ? 'block' : 'none';
}

function submitPrItem() {
  const cat = document.getElementById('pr-category').value;
  const type = document.getElementById('pr-type').value;
  
  if (type === 'link') {
    const url = document.getElementById('pr-url-input').value.trim();
    if (!url) {
      showToast('กรุณาระบุ URL', 'warning');
      return;
    }
    
    const coverInput = document.getElementById('pr-link-cover-input');
    const coverFile = coverInput && coverInput.files ? coverInput.files[0] : null;
    
    if (coverFile) {
      const reader = new FileReader();
      reader.onload = function(e) {
        safetyItems.unshift({ id: 'safety-' + Date.now(), type: 'link', src: url, category: cat, coverImg: e.target.result });
        saveSafetyItems();
        renderSafetyItems();
        closePrModal();
        showToast('เพิ่มลิงก์พร้อมหน้าปกเรียบร้อย', 'success');
      };
      reader.readAsDataURL(coverFile);
    } else {
      safetyItems.unshift({ id: 'safety-' + Date.now(), type: 'link', src: url, category: cat });
      saveSafetyItems();
      renderSafetyItems();
      closePrModal();
      showToast('เพิ่มลิงก์เว็บไซต์เรียบร้อยแล้ว', 'success');
    }
  } else {
    const files = document.getElementById('pr-file-input').files;
    if (!files || files.length === 0) {
      showToast('กรุณาเลือกรูปภาพอย่างน้อย 1 ไฟล์', 'warning');
      return;
    }
    
    let addedCount = 0;
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (!file.type.startsWith('image/')) continue;
      
      const reader = new FileReader();
      reader.onload = (e) => {
        safetyItems.unshift({ id: 'img-' + Date.now() + i, type: 'image', src: e.target.result, category: cat });
        saveSafetyItems();
        renderSafetyItems();
      };
      reader.readAsDataURL(file);
      addedCount++;
    }
    
    if (addedCount > 0) showToast('เพิ่มรูปภาพเรียบร้อยแล้ว', 'success');
    closePrModal();
  }
}

function saveSafetyItems() {
  try {
    localStorage.setItem('safety_items_v2', JSON.stringify(safetyItems));
  } catch (e) {
    // If quota exceeded (usually ~5MB)
    showToast('ไม่สามารถบันทึกได้ เนื่องจากไฟล์ภาพมีขนาดใหญ่เกินกว่าที่เบราว์เซอร์รองรับ', 'error');
    safetyItems.shift(); // Remove the last added item
  }
}

// ==========================================
// CATEGORY EDITOR LOGIC
// ==========================================
function openCategoryEditor() {
  document.getElementById('category-editor-modal').classList.add('active');
  document.getElementById('new-category-name').value = '';
  renderCategoryEditorList();
}

function closeCategoryEditor(e) {
  if (e && e.target !== document.getElementById('category-editor-modal')) return;
  document.getElementById('category-editor-modal').classList.remove('active');
}

function renderCategoryEditorList() {
  const container = document.getElementById('category-list-container');
  if (!container) return;
  
  if (safetyCategories.length === 0) {
    container.innerHTML = '<p style="text-align:center; color:var(--text-muted); font-size:0.85rem;">ยังไม่มีหมวดหมู่</p>';
    return;
  }

  container.innerHTML = safetyCategories.map(cat => `
    <div style="display:flex; justify-content:space-between; align-items:center; padding:10px; background:#f8fafc; border:1px solid var(--border-color); border-radius:var(--radius-sm);">
      <span style="font-weight:600; color:var(--text-headings);">${cat.name}</span>
      <div style="display:flex; gap:12px;">
        <button onclick="editSafetyCategory('${cat.id}')" style="background:none; border:none; color:var(--primary); cursor:pointer;" title="แก้ไขชื่อหมวดหมู่นี้">
          <i data-lucide="edit-2" style="width:16px; height:16px;"></i>
        </button>
        <button onclick="removeSafetyCategory('${cat.id}')" style="background:none; border:none; color:#ef4444; cursor:pointer;" title="ลบหมวดหมู่นี้">
          <i data-lucide="trash-2" style="width:16px; height:16px;"></i>
        </button>
      </div>
    </div>
  `).join('');
  lucide.createIcons();
}

function addSafetyCategory() {
  const input = document.getElementById('new-category-name');
  const name = input.value.trim();
  if (!name) return showToast('กรุณาระบุชื่อหมวดหมู่', 'warning');
  
  const id = 'cat-' + Date.now();
  safetyCategories.push({ id, name });
  localStorage.setItem('safety_categories_v2', JSON.stringify(safetyCategories));
  
  input.value = '';
  renderCategoryEditorList();
  renderSafetyCategoryTabs();
  renderSafetyItems();
  showToast('เพิ่มหมวดหมู่เรียบร้อย', 'success');
}
function editSafetyCategory(id) {
  const cat = safetyCategories.find(c => c.id === id);
  if (!cat) return;
  const newName = prompt('ระบุชื่อหมวดหมู่ใหม่:', cat.name);
  if (newName && newName.trim() !== '') {
    cat.name = newName.trim();
    localStorage.setItem('safety_categories_v2', JSON.stringify(safetyCategories));
    renderCategoryEditorList();
    renderSafetyCategoryTabs();
    renderSafetyItems();
    showToast('แก้ไขชื่อหมวดหมู่เรียบร้อย', 'success');
  }
}

function removeSafetyCategory(id) {
  if (confirm('คุณต้องการลบหมวดหมู่นี้ใช่หรือไม่? (ประกาศที่อยู่ในหมวดหมู่นี้จะถูกย้ายไปหมวดหมู่แรกอัตโนมัติ)')) {
    safetyCategories = safetyCategories.filter(cat => cat.id !== id);
    localStorage.setItem('safety_categories_v2', JSON.stringify(safetyCategories));
    
    // Update existing items that used this category
    const fallbackCat = safetyCategories.length > 0 ? safetyCategories[0].id : 'general';
    let changed = false;
    safetyItems.forEach(item => {
      if (item.category === id) {
        item.category = fallbackCat;
        changed = true;
      }
    });
    
    if (changed) saveSafetyItems();
    if (currentSafetyCategory === id) currentSafetyCategory = 'all';
    
    renderCategoryEditorList();
    renderSafetyCategoryTabs();
    renderSafetyItems();
    showToast('ลบหมวดหมู่เรียบร้อย', 'success');
  }
}

// ==========================================
// 8. FORM SUBMISSION & LOCALSTORAGE
// ==========================================
async function handleFormSubmit(event) {
  event.preventDefault();

  showToast('กำลังบันทึกข้อมูลและอัปโหลดไฟล์...', 'info');

  const permitNo     = document.getElementById('input-permit-no').value.trim();
  const permitType   = document.getElementById('select-permit-type').value;
  const workArea     = document.getElementById('select-work-area').value;
  const date         = document.getElementById('input-date').value;
  const auditorName  = document.getElementById('input-auditor').value.trim();
  const auditorDept  = document.getElementById('select-auditor-dept').value;
  const remarks      = document.getElementById('input-remarks').value.trim();
  const status       = document.getElementById('select-status').value;

  const checklist = {};
  CHECKLIST_DEFINITIONS.forEach(category => {
    category.items.forEach(item => {
      const radio = document.querySelector(`input[name="chk-${item.id}"]:checked`);
      checklist[item.id] = radio ? radio.value : 'pass';
    });
  });

  try {
    // 1. Upload files to Google Drive via Apps Script
    const uploadedAttachments = [];
    const GAS_URL = "https://script.google.com/macros/s/AKfycbw6y0aNpcaeZttKd1C9EIeRPD2e6vkQ-HG5y7OPAFO2JsOyiVDXPCr9OY1gFYEKejWC1w/exec";

    for (let i = 0; i < pendingFiles.length; i++) {
      const fileObj = pendingFiles[i];
      const fileName = `${Date.now()}_${fileObj.name}`;
      
      const payload = {
        base64: fileObj.data,
        fileName: fileName,
        mimeType: fileObj.type
      };

      const response = await fetch(GAS_URL, {
        method: 'POST',
        body: JSON.stringify(payload)
      });
      
      const result = await response.json();
      
      if (result.status === 'success') {
        uploadedAttachments.push({
          name: fileObj.name,
          type: fileObj.type,
          size: fileObj.size,
          data: result.url
        });
      } else {
        throw new Error('Upload to Drive failed: ' + result.message);
      }
    }

    // 2. Save to Firestore
    const newAudit = {
      permitNo, permitType, workArea, date,
      auditorName, auditorDept, checklist, status, remarks,
      attachments: uploadedAttachments,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    };

    await db.collection('audits').add(newAudit);

    // Auto-sync กราฟ 3 และ 4 ให้แสดงเดือนของข้อมูลที่เพิ่งบันทึก
    const auditMonth = getMonthShortFromDate(date);
    const validMonths = ['Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'];
    if (validMonths.includes(auditMonth)) {
      changeSelectedMonth(auditMonth);
      changeWorkAreaMonth(auditMonth);
    }

    showToast('ดำเนินการบันทึกผลการตรวจประเมินสำเร็จ', 'success');
    alert('ดำเนินการบันทึกผลการตรวจประเมินสำเร็จ');
    resetForm();
  } catch (error) {
    showToast('ไม่สามารถบันทึกได้: ' + error.message, 'error');
    console.error("Firebase save error:", error);
  }
}

function resetForm() {
  document.getElementById('audit-form').reset();
  pendingFiles = [];
  const previewList = document.getElementById('file-preview-list');
  if (previewList) previewList.innerHTML = '';
  setDefaultDateTime();
  renderChecklistForm();
  lucide.createIcons();
}

function getMonthShortFromDate(dateStr) {
  const parts = dateStr.split('-');
  if (parts.length !== 3) return 'Jan';
  const m = parseInt(parts[1]);
  switch (m) {
    case 11: return 'Nov';
    case 12: return 'Dec';
    case 1:  return 'Jan';
    case 2:  return 'Feb';
    case 3:  return 'Mar';
    case 4:  return 'Apr';
    case 5:  return 'May';
    case 6:  return 'Jun';
    case 7:  return 'Jul';
    case 8:  return 'Aug';
    case 9:  return 'Sep';
    case 10: return 'Oct';
    default: return 'Oct';
  }
}

// ==========================================
// 9. DATA GRID & FILTERS (HISTORY TAB)
// ==========================================
function applyFilters() {
  const searchQuery = document.getElementById('filter-search').value.toLowerCase();
  const area        = document.getElementById('filter-area').value;
  const status      = document.getElementById('filter-status').value;
  const filterDate  = document.getElementById('filter-date').value;

  const filtered = auditsDatabase.filter(audit => {
    const matchSearch =
      audit.permitNo.toLowerCase().includes(searchQuery) ||
      (audit.auditorName && audit.auditorName.toLowerCase().includes(searchQuery)) ||
      (audit.workArea && audit.workArea.toLowerCase().includes(searchQuery)) ||
      (audit.auditorDept && audit.auditorDept.toLowerCase().includes(searchQuery));

    const matchArea   = area === 'all' || audit.auditorDept === area;
    const matchStatus = status === 'all' || audit.status === status;
    const matchDate   = !filterDate || audit.date === filterDate;

    return matchSearch && matchArea && matchStatus && matchDate;
  });

  renderHistoryTable(filtered);
}

function clearFilters() {
  document.getElementById('filter-search').value = '';
  document.getElementById('filter-area').value   = 'all';
  document.getElementById('filter-status').value  = 'all';
  document.getElementById('filter-date').value   = '';
  applyFilters();
}

function renderHistoryTable(data) {
  const tbody          = document.getElementById('audits-table-body');
  const emptyIndicator = document.getElementById('no-data-indicator');
  const table          = document.getElementById('audits-table');

  tbody.innerHTML = '';

  if (data.length === 0) {
    emptyIndicator.style.display = 'block';
    table.style.display = 'none';
    return;
  }

  emptyIndicator.style.display = 'none';
  table.style.display = 'table';

  data.forEach(audit => {
    const tr = document.createElement('tr');

    const statusBadge = audit.status === 'conformance'
      ? `<span class="badge badge-approved">สอดคล้อง</span>`
      : `<span class="badge badge-rejected">ไม่สอดคล้อง</span>`;

    const dateParts     = audit.date.split('-');
    const formattedDate = dateParts.length === 3 ? `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}` : audit.date;

    const attachCount = (audit.attachments && audit.attachments.length) || 0;
    const attachBadge = attachCount > 0
      ? `<span style="display:inline-flex;align-items:center;gap:4px;font-size:0.75rem;background:#dbeafe;color:#1d4ed8;padding:2px 8px;border-radius:50px;font-weight:700;"><i data-lucide="paperclip" style="width:12px;height:12px;"></i> ${attachCount}</span>`
      : `<span style="color:var(--text-muted);font-size:0.8rem;">-</span>`;

    tr.innerHTML = `
      <td>${formattedDate}</td>
      <td style="font-weight:700;font-size:0.95rem;color:var(--text-headings);">${audit.permitNo}</td>
      <td style="font-size:0.85rem;">${audit.permitType || '-'}</td>
      <td style="font-weight:600;">${audit.workArea || '-'}</td>
      <td style="font-size:0.85rem;">${audit.auditorDept || '-'}</td>
      <td>${audit.auditorName}</td>
      <td>${statusBadge}</td>
      <td>${attachBadge}</td>
      <td>
        <div class="action-btns">
          <button class="btn btn-secondary btn-icon" onclick="openDetailsModal('${audit.id}')" title="ดูรายละเอียด">
            <i data-lucide="eye" style="width:16px;height:16px;"></i>
          </button>
          <button class="btn btn-danger btn-icon" onclick="deleteAuditRecord('${audit.id}')" title="ลบข้อมูล">
            <i data-lucide="trash-2" style="width:16px;height:16px;"></i>
          </button>
        </div>
      </td>
    `;
    tbody.appendChild(tr);
  });

  lucide.createIcons();
}

async function deleteAuditRecord(id) {
  if (confirm('คุณต้องการลบบันทึกการตรวจประเมินรายการนี้ใช่หรือไม่?')) {
    try {
      await db.collection('audits').doc(id).delete();
      showToast('ลบประวัติการตรวจประเมินเรียบร้อย', 'warning');
      // note: onSnapshot will handle UI updates automatically
    } catch(error) {
      showToast('ไม่สามารถลบข้อมูลได้', 'error');
      console.error('Firebase Error on delete:', error);
    }
  }
}

// ==========================================
// 10. EXCEL EXPORT (SHEETJS)
// ==========================================
function exportToExcel() {
  if (auditsDatabase.length === 0) {
    showToast('ไม่มีข้อมูลการตรวจประเมินเพื่อส่งออก', 'error');
    return;
  }

  const rows = [];

  auditsDatabase.forEach(audit => {
    const statusText  = audit.status === 'conformance' ? 'สอดคล้อง (Conformance)' : 'ไม่สอดคล้อง (Non-Conformance)';
    const attachCount = (audit.attachments && audit.attachments.length) || 0;

    const excelRow = {
      'วันที่ตรวจประเมิน'        : audit.date,
      'เลขที่ใบอนุญาตทำงาน'      : audit.permitNo,
      'ประเภทใบอนุญาตทำงาน'      : audit.permitType || '',
      'พื้นที่ปฏิบัติงาน'        : audit.workArea || '',
      'หน่วยงานผู้ตรวจประเมิน'   : audit.auditorDept || '',
      'ชื่อผู้ตรวจประเมิน'        : audit.auditorName,
      'สรุปผลการตรวจประเมิน'     : statusText,
      'มีเอกสารแนบ'              : attachCount > 0 ? 'ใช่' : 'ไม่ใช่',
      'จำนวนไฟล์แนบ'             : attachCount,
      'ข้อสังเกต/ข้อบกพร่อง'     : audit.remarks || ''
    };

    CHECKLIST_DEFINITIONS.forEach(cat => {
      cat.items.forEach(item => {
        const val = audit.checklist[item.id] || 'pass';
        const valText = val === 'fail' ? 'ไม่สอดคล้อง' : val === 'na' ? 'ไม่เกี่ยวข้อง (N/A)' : 'สอดคล้อง';
        excelRow[`${item.id}: ${item.text.substring(0, 60)}`] = valText;
      });
    });

    rows.push(excelRow);
  });

  const worksheet = XLSX.utils.json_to_sheet(rows);
  const workbook  = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'PTW Inspections');

  const maxProps = {};
  rows.forEach(row => {
    Object.keys(row).forEach(key => {
      const length = String(row[key] || '').length + 4;
      maxProps[key] = Math.max(maxProps[key] || 10, length, key.length + 4);
    });
  });
  worksheet['!cols'] = Object.keys(maxProps).map(key => ({ wch: Math.min(maxProps[key], 50) }));

  const dateStr = new Date().toISOString().split('T')[0];
  XLSX.writeFile(workbook, `PTW_Inspections_${dateStr}.xlsx`);
  showToast('ดาวน์โหลดเอกสาร Excel เรียบร้อย', 'success');
}

// ==========================================
// 11. DETAILS MODAL
// ==========================================
function openDetailsModal(auditId) {
  const audit = auditsDatabase.find(a => a.id === auditId);
  if (!audit) return;

  const modal = document.getElementById('details-modal');
  const body  = document.getElementById('modal-body-content');

  const statusBadge = audit.status === 'conformance'
    ? `<span class="badge badge-approved" style="font-size:0.9rem;">สอดคล้อง (Conformance)</span>`
    : `<span class="badge badge-rejected" style="font-size:0.9rem;">ไม่สอดคล้อง (Non-Conformance)</span>`;

  const dateParts     = audit.date.split('-');
  const formattedDate = dateParts.length === 3 ? `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}` : audit.date;

  // Build checklist HTML
  let checklistHtml = '';
  CHECKLIST_DEFINITIONS.forEach(category => {
    checklistHtml += `<div class="modal-section-title">${category.title}</div><div class="modal-checklist-list">`;
    category.items.forEach(item => {
      const val = audit.checklist[item.id] || 'pass';
      const badge = val === 'pass'
        ? `<span class="badge badge-approved">สอดคล้อง</span>`
        : val === 'fail'
          ? `<span class="badge badge-rejected">ไม่สอดคล้อง</span>`
          : `<span class="badge" style="background:#e2e8f0;color:var(--text-muted);">N/A</span>`;
      checklistHtml += `<div class="modal-checklist-row"><span class="modal-checklist-text">${item.id}. ${item.text}</span>${badge}</div>`;
    });
    checklistHtml += `</div>`;
  });

  // Build attachments HTML
  let attachHtml = '';
  if (audit.attachments && audit.attachments.length > 0) {
    attachHtml = `
      <h3 style="font-size:1.05rem;font-weight:800;color:var(--text-headings);margin:24px 0 12px;border-bottom:1px solid var(--border-color);padding-bottom:8px;display:flex;align-items:center;gap:8px;">
        <i data-lucide="paperclip" style="color:var(--primary);"></i> เอกสารหลักฐานที่แนบ (${audit.attachments.length} ไฟล์)
      </h3>
      <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:16px;">`;
    audit.attachments.forEach((file, idx) => {
      const isImage = file.type && file.type.startsWith('image/');
      const sizeKB  = (file.size / 1024).toFixed(1);
      attachHtml += `
        <div style="display:flex;align-items:center;justify-content:space-between;padding:10px 14px;background:#f8fafc;border:1px solid var(--border-color);border-radius:8px;">
          <div style="display:flex;align-items:center;gap:10px;">
            <i data-lucide="${isImage ? 'image' : 'file-text'}" style="width:18px;height:18px;color:var(--primary);"></i>
            <div>
              <div style="font-weight:600;font-size:0.85rem;">${file.name}</div>
              <div style="font-size:0.75rem;color:var(--text-muted);">${sizeKB} KB</div>
            </div>
          </div>
          <div style="display:flex;gap:8px;">
            ${isImage ? `<button onclick="previewImage(${idx},'${audit.id}')" style="background:var(--primary);color:#fff;border:none;padding:4px 10px;border-radius:6px;cursor:pointer;font-size:0.75rem;font-weight:600;">ดูรูป</button>` : ''}
            <button onclick="downloadFile(${idx},'${audit.id}')" style="background:var(--success);color:#fff;border:none;padding:4px 10px;border-radius:6px;cursor:pointer;font-size:0.75rem;font-weight:600;">ดาวน์โหลด</button>
          </div>
        </div>`;
    });
    attachHtml += `</div>`;
  }

  body.innerHTML = `
    <div class="modal-info-grid">
      <div class="modal-info-item"><label>เลขที่ใบอนุญาต</label><span style="font-weight:700;color:var(--primary);">${audit.permitNo}</span></div>
      <div class="modal-info-item"><label>ประเภทใบอนุญาต</label><span>${audit.permitType || '-'}</span></div>
      <div class="modal-info-item"><label>วันที่ตรวจประเมิน</label><span>${formattedDate}</span></div>
      <div class="modal-info-item"><label>พื้นที่ปฏิบัติงาน</label><span>${audit.workArea || '-'}</span></div>
      <div class="modal-info-item"><label>หน่วยงานผู้ตรวจ</label><span>${audit.auditorDept || '-'}</span></div>
      <div class="modal-info-item"><label>ผู้ตรวจประเมิน</label><span>${audit.auditorName}</span></div>
      <div class="modal-info-item" style="grid-column:span 3;"><label>ผลการตรวจประเมินโดยสรุป</label><div>${statusBadge}</div></div>
    </div>

    ${audit.remarks ? `
    <div style="background:#f8fafc;border:1px solid var(--border-color);border-radius:var(--radius-md);padding:16px;margin-bottom:24px;">
      <div style="font-size:0.7rem;color:var(--text-muted);text-transform:uppercase;font-weight:800;margin-bottom:6px;letter-spacing:0.5px;">ข้อสังเกตและข้อบกพร่องที่พบ</div>
      <div style="font-size:0.9rem;font-weight:400;color:var(--text-main);line-height:1.55;">${audit.remarks}</div>
    </div>` : ''}

    ${attachHtml}

    <h3 style="font-size:1.05rem;font-weight:800;color:var(--text-headings);margin-bottom:16px;border-bottom:1px solid var(--border-color);padding-bottom:8px;display:flex;align-items:center;gap:8px;">
      <i data-lucide="check-square" style="color:var(--primary);"></i> รายการตรวจสอบ 5 หมวด 18 ข้อ
    </h3>
    ${checklistHtml}
  `;

  modal.classList.add('active');
  lucide.createIcons();
}

function previewImage(fileIdx, auditId) {
  const audit = auditsDatabase.find(a => a.id === auditId);
  if (!audit) return;
  const file = audit.attachments[parseInt(fileIdx)];
  if (!file) return;
  const win = window.open('', '_blank');
  win.document.write(`<html><body style="margin:0;background:#000;display:flex;justify-content:center;align-items:center;min-height:100vh;"><img src="${file.data}" style="max-width:100%;max-height:100vh;object-fit:contain;"></body></html>`);
  win.document.close();
}

function downloadFile(fileIdx, auditId) {
  const audit = auditsDatabase.find(a => a.id === auditId);
  if (!audit) return;
  const file = audit.attachments[parseInt(fileIdx)];
  if (!file) return;
  const a = document.createElement('a');
  a.href = file.data;
  a.download = file.name;
  a.click();
}

function closeModal(event) {
  document.getElementById('details-modal').classList.remove('active');
}

function printModalContent() {
  const printContent = document.getElementById('modal-body-content').innerHTML;
  const printWindow  = window.open('', '_blank', 'width=900,height=800');
  printWindow.document.write(`
    <html><head><title>PTW Inspection Report</title>
    <style>
      body{font-family:'Segoe UI',Tahoma,sans-serif;padding:30px;color:#1e293b;background:#fff;}
      .modal-info-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:15px;border:1px solid #e2e8f0;background:#f8fafc;border-radius:8px;padding:15px;margin-bottom:20px;}
      .modal-info-item{display:flex;flex-direction:column;}
      .modal-info-item label{font-size:.75rem;color:#64748b;text-transform:uppercase;font-weight:600;}
      .modal-info-item span{font-size:.95rem;font-weight:500;margin-top:3px;}
      .badge{display:inline-block;padding:3px 10px;font-size:.75rem;font-weight:600;border-radius:50px;border:1px solid transparent;}
      .badge-approved{background:#d1fae5;color:#065f46;border-color:#a7f3d0;}
      .badge-rejected{background:#fee2e2;color:#991b1b;border-color:#fca5a5;}
      .modal-section-title{font-size:1rem;font-weight:600;color:#2563eb;margin-top:20px;margin-bottom:10px;border-bottom:1px solid #e2e8f0;padding-bottom:5px;}
      .modal-checklist-list{display:flex;flex-direction:column;gap:6px;}
      .modal-checklist-row{display:flex;justify-content:space-between;padding:6px 10px;background:#f8fafc;border-radius:4px;border:1px solid #f1f5f9;font-size:.85rem;}
      button{display:none;}
    </style></head><body>
    <h2 style="text-align:center;margin-bottom:25px;color:#0f172a;">ใบรายงานการตรวจประเมินใบอนุญาตทำงาน (PTW Inspection Report)</h2>
    ${printContent}
    <div style="margin-top:50px;display:flex;justify-content:space-between;font-size:.9rem;">
      <div>ผู้ตรวจประเมิน: ______________________________</div>
      <div>ผู้ควบคุมงาน: ______________________________</div>
    </div>
    <script>window.onload=function(){window.print();window.onafterprint=function(){window.close();};};<\/script>
    </body></html>`);
  printWindow.document.close();
}

// ==========================================
// 12. TOAST NOTIFICATIONS
// ==========================================
function showToast(message, type = 'success') {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  const icon = type === 'warning' ? 'alert-triangle' : type === 'error' ? 'alert-octagon' : 'check-circle-2';
  toast.innerHTML = `<i data-lucide="${icon}"></i><span>${message}</span>`;
  container.appendChild(toast);
  lucide.createIcons();
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px) scale(0.9)';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// ==========================================
// 13. DASHBOARD ANALYTICS
// ==========================================
function updateDashboard() {
  // Build dynamic counts from recorded audits
  const dynamicMonthlyCounts = {};
  editableBaseline.forEach(b => { dynamicMonthlyCounts[b.month] = { inspect: 0, defect: 0 }; });

  auditsDatabase.forEach(audit => {
    const month = getMonthShortFromDate(audit.date);
    if (dynamicMonthlyCounts[month]) {
      dynamicMonthlyCounts[month].inspect++;
      if (audit.status === 'non_conformance') dynamicMonthlyCounts[month].defect++;
    }
  });

  // Only show months with data (total > 0 OR recorded audits > 0)
  const activeMonths = editableBaseline.filter(b =>
    b.total > 0 || (dynamicMonthlyCounts[b.month] && dynamicMonthlyCounts[b.month].inspect > 0)
  );

  const currentOverall = activeMonths.map(base => {
    const added  = dynamicMonthlyCounts[base.month] ? dynamicMonthlyCounts[base.month].inspect : 0;
    const newIns = base.inspect + added;
    const pct    = base.total > 0 ? (newIns / base.total) * 100 : 0;
    return { month: base.month, label: base.label, total: base.total, inspect: newIns, percentage: parseFloat(pct.toFixed(2)) };
  });

  const currentDefects = activeMonths.map(base => {
    const overall   = currentOverall.find(o => o.month === base.month);
    const totalIns  = overall ? overall.inspect : 0;
    const addedDef  = dynamicMonthlyCounts[base.month] ? dynamicMonthlyCounts[base.month].defect : 0;
    const newDef    = base.defect + addedDef;
    const defRate   = totalIns > 0 ? (newDef / totalIns) * 100 : 0;
    return { month: base.month, defectCount: newDef, defectRate: parseFloat(defRate.toFixed(2)) };
  });

  const totalInspect = currentOverall.reduce((s, c) => s + c.inspect, 0);
  const totalDefect  = currentDefects.reduce((s, c) => s + c.defectCount, 0);
  const monthsWithPct = currentOverall.filter(c => c.percentage > 0);
  const avgInspect   = monthsWithPct.length > 0
    ? (monthsWithPct.reduce((s, c) => s + c.percentage, 0) / monthsWithPct.length).toFixed(2)
    : '0.00';
  const ytdRate      = totalInspect > 0 ? (totalDefect / totalInspect) * 100 : 0;
  const isOnTrack    = ytdRate <= DEFECT_TARGET;

  document.getElementById('kpi-total-inspect').textContent = totalInspect.toLocaleString();
  document.getElementById('kpi-inspect-avg').textContent   = `${avgInspect}%`;
  document.getElementById('kpi-defect-rate').textContent   = `${ytdRate.toFixed(2)}%`;
  document.getElementById('kpi-defect-count').textContent  = `${totalDefect} ใบ`;

  document.getElementById('live-indicator-text').textContent = `YTD Actual: ${ytdRate.toFixed(2)}%`;

  const indicatorDot = document.getElementById('live-indicator-dot');
  const ptwCard      = document.getElementById('kpi-ptw-card');
  const targetBadge  = document.getElementById('kpi-target-status-badge');
  const targetText   = document.getElementById('kpi-target-status-text');
  const kpiIcon      = document.getElementById('kpi-defect-icon');

  if (isOnTrack) {
    indicatorDot.style.background   = 'var(--success)';
    ptwCard.style.borderTopColor    = 'var(--success)';
    targetBadge.className           = 'target-pulsing-badge';
    targetText.textContent          = 'ON TARGET';
    kpiIcon.setAttribute('data-lucide', 'shield-check');
    kpiIcon.style.color             = 'rgba(16, 185, 129, 0.08)';
  } else {
    indicatorDot.style.background   = 'var(--danger)';
    ptwCard.style.borderTopColor    = 'var(--danger)';
    targetBadge.className           = 'target-pulsing-badge over-limit';
    targetText.textContent          = 'OVER LIMIT';
    kpiIcon.setAttribute('data-lucide', 'alert-circle');
    kpiIcon.style.color             = 'rgba(239, 68, 68, 0.08)';
  }

  lucide.createIcons();
  renderComposedChart(currentOverall);
  renderDefectChart(currentDefects);
  updateAuditorDeptChart();
  updateWorkAreaChart();
}

// Chart 1: Monthly Inspection % (Composed Bar + Line)
function renderComposedChart(data) {
  const ctx = document.getElementById('composedChart').getContext('2d');
  if (charts.composed) charts.composed.destroy();

  const labels      = data.map(d => d.month);
  const percentages = data.map(d => d.percentage);

  charts.composed = new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [
        { label: 'ร้อยละการสุ่มตรวจรายเดือน', type: 'bar', data: percentages, backgroundColor: '#3b82f6', borderRadius: 6, barPercentage: 0.55, order: 2 },
        { label: 'แนวโน้มสุ่มตรวจ', type: 'line', data: percentages, borderColor: '#1e40af', borderWidth: 3, pointBackgroundColor: '#1e40af', pointBorderColor: '#ffffff', pointBorderWidth: 2, pointRadius: 5, fill: false, tension: 0.1, order: 1 },
        { label: 'เป้าหมาย (Target 10%)', type: 'line', data: Array(labels.length).fill(10.0), borderColor: '#3b82f6', borderWidth: 1.5, borderDash: [6, 4], pointRadius: 0, fill: false, order: 3 }
      ]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: {
        legend: { display: true, position: 'bottom', labels: { boxWidth: 12, font: { family: 'Prompt', size: 11 }, color: '#64748b' } },
        tooltip: {
          backgroundColor: '#ffffff', titleColor: '#0f172a', bodyColor: '#1e293b', borderColor: '#e2e8f0', borderWidth: 1,
          titleFont: { family: 'Prompt', weight: 'bold' }, bodyFont: { family: 'Prompt' },
          callbacks: {
            label: ctx => {
              const baseText = ` ${ctx.dataset.label}: ${ctx.raw.toFixed(2)}%`;
              if (ctx.datasetIndex === 0 || ctx.datasetIndex === 1) {
                return [baseText, ` จำนวนตรวจจริง: ${data[ctx.dataIndex].inspect} ใบ`];
              }
              return baseText;
            }
          }
        }
      },
      scales: {
        x: { grid: { display: false }, ticks: { color: '#64748b', font: { family: 'Prompt', weight: 'bold' } } },
        y: { grid: { color: '#f1f5f9' }, ticks: { color: '#94a3b8', font: { family: 'Prompt' }, callback: v => v + '%' }, min: 0, max: 30 }
      }
    }
  });
}

// Chart 2: Non-Conformance Rate (สีเขียว = ปกติ, แดง = เกินเกณฑ์)
function renderDefectChart(data) {
  const ctx = document.getElementById('defectChart').getContext('2d');
  if (charts.defect) charts.defect.destroy();

  const labels      = data.map(d => d.month);
  const defectRates = data.map(d => d.defectRate);
  const barColors   = defectRates.map(rate => rate >= DEFECT_TARGET ? '#ef4444' : '#10b981');

  charts.defect = new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [
        { label: '% Non-Conformance', data: defectRates, backgroundColor: barColors, borderRadius: 6, barPercentage: 0.55, order: 1 },
        { label: 'เกณฑ์ควบคุม (Limit 0.19%)', type: 'line', data: Array(labels.length).fill(DEFECT_TARGET), borderColor: '#ef4444', borderWidth: 1.5, borderDash: [8, 4], pointRadius: 0, fill: false, order: 2 }
      ]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: {
        legend: { display: true, position: 'bottom', labels: { boxWidth: 12, font: { family: 'Prompt', size: 11 }, color: '#64748b' } },
        tooltip: { backgroundColor: '#ffffff', titleColor: '#0f172a', bodyColor: '#1e293b', borderColor: '#e2e8f0', borderWidth: 1, titleFont: { family: 'Prompt', weight: 'bold' }, bodyFont: { family: 'Prompt' }, callbacks: { label: ctx => ` ${ctx.dataset.label}: ${ctx.raw.toFixed(2)}%` } }
      },
      scales: {
        x: { grid: { display: false }, ticks: { color: '#64748b', font: { family: 'Prompt', weight: 'bold' } } },
        y: { grid: { color: '#f1f5f9' }, ticks: { color: '#94a3b8', font: { family: 'Prompt' }, callback: v => v.toFixed(2) + '%' }, min: 0, max: 0.5 }
      }
    }
  });
}

// Chart 3: Auditor Dept Breakdown — baseline months + recorded-only for Apr/May
function updateAuditorDeptChart() {
  const ctx = document.getElementById('auditorDeptChart').getContext('2d');
  if (charts.auditorDept) charts.auditorDept.destroy();

  const hasBaseline = !!BASELINE_AREA_PERCENTAGES[selectedMonth];
  const DEPT_LIST   = BASELINE_AREA_PERCENTAGES['Jan'].map(d => d.area);

  let labels, percentages, counts, maxY;
  let datasets;

  if (hasBaseline) {
    // Use baseline % + add recorded audits on top
    const areaData = BASELINE_AREA_PERCENTAGES[selectedMonth].map(item => ({
      area: item.area,
      percentage: item.percentage,
      actualCount: Math.round((item.percentage / 100) * FIXED_TARGET_COUNT)
    }));
    auditsDatabase.forEach(audit => {
      if (getMonthShortFromDate(audit.date) === selectedMonth && audit.auditorDept) {
        const match = areaData.find(a => a.area === audit.auditorDept);
        if (match) {
          match.actualCount++;
          match.percentage = parseFloat(((match.actualCount / FIXED_TARGET_COUNT) * 100).toFixed(2));
        }
      }
    });
    labels     = areaData.map(d => d.area);
    percentages = areaData.map(d => d.percentage);
    counts     = areaData.map(d => d.actualCount);
    maxY       = 400;

    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, '#06b6d4');
    gradient.addColorStop(1, '#2563eb');

    datasets = [
      { label: 'ร้อยละการดำเนินงานเทียบกับเป้าหมาย', data: percentages, backgroundColor: gradient, borderRadius: 8, barPercentage: 0.65, order: 1 },
      { label: 'เป้าหมายมาตรฐาน (100%)', type: 'line', data: Array(labels.length).fill(100), borderColor: '#f43f5e', borderWidth: 2, borderDash: [8, 4], pointRadius: 0, fill: false, order: 2 }
    ];
  } else {
    // No baseline: show recorded-only as actual count bar
    const deptCounts = {};
    DEPT_LIST.forEach(d => { deptCounts[d] = 0; });
    auditsDatabase.forEach(audit => {
      if (getMonthShortFromDate(audit.date) === selectedMonth && audit.auditorDept && deptCounts.hasOwnProperty(audit.auditorDept)) {
        deptCounts[audit.auditorDept]++;
      }
    });
    labels      = DEPT_LIST;
    counts      = DEPT_LIST.map(d => deptCounts[d]);
    percentages = counts.map(c => parseFloat(((c / FIXED_TARGET_COUNT) * 100).toFixed(2)));
    maxY        = 150;

    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, '#a78bfa');
    gradient.addColorStop(1, '#7c3aed');

    datasets = [
      { label: 'จำนวนตรวจจริง (ใบ)', data: counts, backgroundColor: gradient, borderRadius: 8, barPercentage: 0.65 },
      { label: 'เป้าหมาย (40 ใบ/เดือน)', type: 'line', data: Array(labels.length).fill(FIXED_TARGET_COUNT), borderColor: '#f43f5e', borderWidth: 2, borderDash: [8, 4], pointRadius: 0, fill: false }
    ];
  }

  charts.auditorDept = new Chart(ctx, {
    type: 'bar',
    data: { labels, datasets },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: {
        legend: { display: true, position: 'bottom', labels: { boxWidth: 12, font: { family: 'Prompt', size: 11 }, color: '#64748b' } },
        tooltip: {
          backgroundColor: '#ffffff', titleColor: '#0f172a', bodyColor: '#1e293b', borderColor: '#e2e8f0', borderWidth: 1,
          titleFont: { family: 'Prompt', weight: 'bold' }, bodyFont: { family: 'Prompt' },
          callbacks: {
            title: ctx => ctx[0].label,
            label: ctx => {
              if (ctx.datasetIndex === 0) {
                if (hasBaseline) return [` ร้อยละ: ${percentages[ctx.dataIndex].toFixed(2)}%`, ` จำนวนจริง: ${counts[ctx.dataIndex]} ใบ (เป้า ${FIXED_TARGET_COUNT} ใบ/เดือน)`];
                return ` จำนวน: ${counts[ctx.dataIndex]} ใบ`;
              }
              return ` ${ctx.dataset.label}`;
            }
          }
        }
      },
      scales: {
        x: { grid: { display: false }, ticks: { color: '#64748b', font: { family: 'Prompt', size: 10, weight: 'bold' }, maxRotation: 45, minRotation: 45 } },
        y: { grid: { color: '#f1f5f9' }, ticks: { color: '#94a3b8', font: { family: 'Prompt' }, callback: v => (hasBaseline ? v + '%' : v) }, min: 0, max: maxY }
      }
    }
  });
}

// Chart 4: Work Area Breakdown (11 areas) — filtered by selectedWorkAreaMonth
function updateWorkAreaChart() {
  const ctx = document.getElementById('workAreaChart').getContext('2d');
  if (charts.workArea) charts.workArea.destroy();

  // Filter audits by selected month
  const filteredAudits = selectedWorkAreaMonth === 'all'
    ? auditsDatabase
    : auditsDatabase.filter(a => getMonthShortFromDate(a.date) === selectedWorkAreaMonth);

  const areaCounts = {};
  WORK_AREAS.forEach(a => { areaCounts[a] = 0; });
  
  // Add baseline counts
  if (selectedWorkAreaMonth === 'all') {
    Object.values(BASELINE_WORK_AREA_COUNTS).forEach(monthCounts => {
      WORK_AREAS.forEach((a, idx) => { areaCounts[a] += monthCounts[idx]; });
    });
  } else if (BASELINE_WORK_AREA_COUNTS[selectedWorkAreaMonth]) {
    const monthCounts = BASELINE_WORK_AREA_COUNTS[selectedWorkAreaMonth];
    WORK_AREAS.forEach((a, idx) => { areaCounts[a] += monthCounts[idx]; });
  }

  // Add actual recorded counts from auditsDatabase
  filteredAudits.forEach(audit => {
    if (audit.workArea && areaCounts.hasOwnProperty(audit.workArea)) areaCounts[audit.workArea]++;
  });

  const labels   = WORK_AREAS;
  const counts   = WORK_AREAS.map(a => areaCounts[a]);
  const totalAll = counts.reduce((s, c) => s + c, 0);

  // Update subtitle
  const subtitle = document.getElementById('area-chart-subtitle');
  if (subtitle) {
    const monthLabel = selectedWorkAreaMonth === 'all' ? 'ทั้งหมด' : selectedWorkAreaMonth;
    subtitle.textContent = `ข้อมูลประจำเดือน ${monthLabel}`;
  }

  const gradient = ctx.createLinearGradient(0, 0, 0, 350);
  gradient.addColorStop(0, '#10b981');
  gradient.addColorStop(1, '#059669');

  charts.workArea = new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        label: 'จำนวนการตรวจประเมิน (ใบ)',
        data: counts,
        backgroundColor: gradient,
        borderRadius: 8,
        barPercentage: 0.65
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: {
        legend: { display: true, position: 'bottom', labels: { boxWidth: 12, font: { family: 'Prompt', size: 11 }, color: '#64748b' } },
        tooltip: {
          backgroundColor: '#ffffff', titleColor: '#0f172a', bodyColor: '#1e293b', borderColor: '#e2e8f0', borderWidth: 1,
          titleFont: { family: 'Prompt', weight: 'bold' }, bodyFont: { family: 'Prompt' },
          callbacks: { label: ctx => ` จำนวน: ${ctx.raw} ใบ` }
        }
      },
      scales: {
        x: { grid: { display: false }, ticks: { color: '#64748b', font: { family: 'Prompt', size: 11, weight: 'bold' }, maxRotation: 30 } },
        y: { grid: { color: '#f1f5f9' }, ticks: { color: '#94a3b8', font: { family: 'Prompt' }, stepSize: 50 }, min: 0, beginAtZero: true }
      }
    }
  });
}

// Sync month selector (chart 3) when form date changes
function updateMonthFromDate() {
  const dateVal = document.getElementById('input-date').value;
  const month   = getMonthShortFromDate(dateVal);
  if (['Nov','Dec','Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct'].includes(month)) changeSelectedMonth(month);
}

// Change selected month for Chart 4 (Work Area)
function changeWorkAreaMonth(month) {
  selectedWorkAreaMonth = month;
  const allMonths = ['all', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'];
  allMonths.forEach(m => {
    const btn = document.getElementById(`btn-area-month-${m}`);
    if (btn) btn.classList.remove('active');
  });
  const activeBtn = document.getElementById(`btn-area-month-${month}`);
  if (activeBtn) activeBtn.classList.add('active');
  updateWorkAreaChart();
}

// ==========================================
// 15. DASHBOARD EDITOR (Editable Baseline)
// ==========================================
function openDashboardEditor() {
  const modal = document.getElementById('dashboard-editor-modal');
  const container = document.getElementById('dashboard-editor-table');

  container.innerHTML = `
    <table style="width:100%;border-collapse:collapse;font-size:0.9rem;">
      <thead>
        <tr style="background:#f8fafc;">
          <th style="padding:12px 16px;text-align:left;font-weight:800;font-size:0.75rem;color:var(--text-muted);text-transform:uppercase;border-bottom:2px solid var(--border-color);">เดือน</th>
          <th style="padding:12px 16px;text-align:center;font-weight:800;font-size:0.75rem;color:var(--text-muted);text-transform:uppercase;border-bottom:2px solid var(--border-color);"><span style="display:flex;flex-direction:column;align-items:center;gap:2px;">ใบ PTW ทั้งหมด</span></th>
          <th style="padding:12px 16px;text-align:center;font-weight:800;font-size:0.75rem;color:#2563eb;text-transform:uppercase;border-bottom:2px solid var(--border-color);">สุ่มตรวจแล้ว (ใบ)</th>
          <th style="padding:12px 16px;text-align:center;font-weight:800;font-size:0.75rem;color:#ef4444;text-transform:uppercase;border-bottom:2px solid var(--border-color);">Non-Conformance (ใบ)</th>
        </tr>
      </thead>
      <tbody>
        ${editableBaseline.map((b, i) => `
          <tr style="border-bottom:1px solid var(--border-color);${b.total===0 && b.inspect===0 ? 'background:#fffbeb;' : ''}">
            <td style="padding:10px 16px;font-weight:700;color:var(--text-headings);">
              ${b.label}
              ${b.total===0 && b.inspect===0 ? '<span style="font-size:0.65rem;background:#fef3c7;color:#b45309;padding:1px 8px;border-radius:50px;border:1px solid #fde68a;margin-left:6px;font-weight:700;">ยังไม่มีข้อมูล</span>' : ''}
            </td>
            <td style="padding:8px 12px;">
              <input type="number" id="baseline-total-${i}" value="${b.total}" min="0"
                style="width:100%;text-align:center;border:1px solid var(--border-color);border-radius:var(--radius-sm);padding:8px;font-family:Prompt,sans-serif;font-weight:700;font-size:1rem;">
            </td>
            <td style="padding:8px 12px;">
              <input type="number" id="baseline-inspect-${i}" value="${b.inspect}" min="0"
                style="width:100%;text-align:center;border:1px solid #bfdbfe;border-radius:var(--radius-sm);padding:8px;font-family:Prompt,sans-serif;font-weight:700;font-size:1rem;background:#eff6ff;">
            </td>
            <td style="padding:8px 12px;">
              <input type="number" id="baseline-defect-${i}" value="${b.defect}" min="0"
                style="width:100%;text-align:center;border:1px solid #fca5a5;border-radius:var(--radius-sm);padding:8px;font-family:Prompt,sans-serif;font-weight:700;font-size:1rem;background:#fff5f5;">
            </td>
          </tr>
        `).join('')}
      </tbody>
    </table>
    <p style="font-size:0.75rem;color:var(--text-muted);margin-top:12px;text-align:right;">
      * เดือนที่ข้อมูลใบ PTW ทั้งหมด = 0 จะไม่แสดงในกราฟจนกว่าจะมีข้อมูลในหน้าประวัติ
    </p>
  `;

  modal.classList.add('active');
  lucide.createIcons();
}

function closeDashboardEditor(event) {
  if (!event || event.target === document.getElementById('dashboard-editor-modal')) {
    document.getElementById('dashboard-editor-modal').classList.remove('active');
  }
}

function saveDashboardSettings() {
  editableBaseline.forEach((b, i) => {
    b.total   = parseInt(document.getElementById(`baseline-total-${i}`).value)   || 0;
    b.inspect = parseInt(document.getElementById(`baseline-inspect-${i}`).value) || 0;
    b.defect  = parseInt(document.getElementById(`baseline-defect-${i}`).value)  || 0;
  });

  localStorage.setItem('ptw_baseline_settings', JSON.stringify(editableBaseline));
  document.getElementById('dashboard-editor-modal').classList.remove('active');
  updateDashboard();
  showToast('บันทึกข้อมูลและอัปเดต Dashboard เรียบร้อย', 'success');
}

// ==========================================
// 14. EXCEL IMPORT (SheetJS Reader)
// ==========================================
function importFromExcel(event) {
  const file = event.target.files[0];
  if (!file) return;
  event.target.value = '';

  const reader = new FileReader();
  reader.onload = async (e) => {
    try {
      const data     = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array', cellDates: true });
      const sheetName = workbook.SheetNames[0];
      const sheet     = workbook.Sheets[sheetName];
      const rows      = XLSX.utils.sheet_to_json(sheet, { defval: '', raw: false });

      if (rows.length === 0) {
        showToast('ไม่พบข้อมูลในไฟล์ Excel ที่เลือก', 'error');
        return;
      }

      const STATUS_MAP = {
        'สอดคล้อง (conformance)': 'conformance',
        'สอดคล้อง': 'conformance',
        'conformance': 'conformance',
        'ไม่สอดคล้อง (non-conformance)': 'non_conformance',
        'ไม่สอดคล้อง (non_conformance)': 'non_conformance',
        'ไม่สอดคล้อง': 'non_conformance',
        'non_conformance': 'non_conformance',
        'non-conformance': 'non_conformance',
      };

      const CHK_MAP = {
        'สอดคล้อง': 'pass', 'pass': 'pass',
        'ไม่สอดคล้อง': 'fail', 'fail': 'fail',
        'ไม่เกี่ยวข้อง (n/a)': 'na', 'ไม่เกี่ยวข้อง (na)': 'na', 'n/a': 'na', 'na': 'na',
      };

      const COL_DATE  = ['วันที่ตรวจประเมิน','Date','date','วันที่'];
      const COL_NO    = ['เลขที่ใบอนุญาตทำงาน','Permit No','PermitNo','permitNo','Permit Number'];
      const COL_TYPE  = ['ประเภทใบอนุญาตทำงาน','Permit Type','permitType'];
      const COL_AREA  = ['พื้นที่ปฏิบัติงาน','Work Area','workArea','Area'];
      const COL_DEPT  = ['หน่วยงานผู้ตรวจประเมิน','Auditor Dept','auditorDept','Department'];
      const COL_NAME  = ['ชื่อผู้ตรวจประเมิน','Auditor Name','auditorName','Auditor'];
      const COL_STAT  = ['สรุปผลการตรวจประเมิน','Status','status','ผลการตรวจ'];
      const COL_REM   = ['ข้อสังเกต/ข้อบกพร่อง','Remarks','remarks','หมายเหตุ'];

      function getVal(row, candidates) {
        for (const key of candidates) {
          if (row[key] !== undefined && row[key] !== '') return String(row[key]).trim();
          const found = Object.keys(row).find(k => k.toLowerCase().trim() === key.toLowerCase());
          if (found && row[found] !== '') return String(row[found]).trim();
        }
        return '';
      }

      function normalizeDate(raw) {
        if (!raw) return '';
        const s = String(raw).trim();
        if (/^\d{4}-\d{2}-\d{2}$/.test(s)) return s;
        const slash = s.match(/^(\d{1,2})\/(\d{1,2})\/(\d{2,4})$/);
        if (slash) {
          const y = slash[3].length === 2 ? '20' + slash[3] : slash[3];
          return `${y}-${slash[2].padStart(2,'0')}-${slash[1].padStart(2,'0')}`;
        }
        const ymd = s.match(/^(\d{4})\/(\d{2})\/(\d{2})$/);
        if (ymd) return `${ymd[1]}-${ymd[2]}-${ymd[3]}`;
        if (s.includes('T')) return s.split('T')[0];
        return s;
      }

      const allItemIds   = CHECKLIST_DEFINITIONS.flatMap(c => c.items.map(i => i.id));
      const existingKeys = new Set(auditsDatabase.map(a => `${a.permitNo}__${a.date}`));
      let importedCount = 0, skippedCount = 0, errorCount = 0;
      const newRecords  = [];

      rows.forEach((row, idx) => {
        try {
          const permitNo = getVal(row, COL_NO);
          if (!permitNo) { errorCount++; return; }

          const date        = normalizeDate(getVal(row, COL_DATE));
          const permitType  = getVal(row, COL_TYPE);
          const workArea    = getVal(row, COL_AREA);
          const auditorDept = getVal(row, COL_DEPT);
          const auditorName = getVal(row, COL_NAME);
          const statusRaw   = getVal(row, COL_STAT);
          const remarks     = getVal(row, COL_REM);

          const key = `${permitNo}__${date}`;
          if (existingKeys.has(key)) { skippedCount++; return; }

          const statusVal = STATUS_MAP[(statusRaw||'').toLowerCase()] || STATUS_MAP[statusRaw] || 'conformance';

          const checklist = {};
          allItemIds.forEach(id => { checklist[id] = 'pass'; });
          Object.keys(row).forEach(col => {
            const upper = col.toUpperCase().trim();
            allItemIds.forEach(id => {
              if (upper.startsWith(id + ':') || upper.startsWith(id + ' ') || upper === id) {
                const rawVal = String(row[col]).trim().toLowerCase();
                checklist[id] = CHK_MAP[rawVal] || 'pass';
              }
            });
          });

          newRecords.push({
            id: `audit-import-${Date.now()}-${idx}`,
            permitNo, permitType: permitType||'', workArea: workArea||'',
            date: date||'', auditorName: auditorName||'',
            auditorDept: auditorDept||'', checklist,
            status: statusVal, remarks: remarks||'', attachments: []
          });
          existingKeys.add(key);
          importedCount++;
        } catch(err) { errorCount++; }
      });

      if (newRecords.length > 0) {
        showToast('กำลังนำเข้าข้อมูลสู่ระบบ กรุณารอสักครู่...', 'info');
        try {
          const batch = db.batch();
          newRecords.forEach(record => {
            const docRef = db.collection('audits').doc();
            record.timestamp = firebase.firestore.FieldValue.serverTimestamp();
            batch.set(docRef, record);
          });
          await batch.commit();
        } catch(error) {
          showToast('พบปัญหาในการบันทึกข้อมูลนำเข้า', 'error');
          console.error(error);
        }
        // Auto-sync month on Dashboard
        const latestImportMonth = getMonthShortFromDate(newRecords[0].date);
        const validMonths = ['Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'];
        if (validMonths.includes(latestImportMonth)) {
          changeSelectedMonth(latestImportMonth);
          changeWorkAreaMonth(latestImportMonth);
        }

        applyFilters();
        updateDashboard();
      }

      const parts = [`นำเข้าสำเร็จ ${importedCount} รายการ`];
      if (skippedCount > 0) parts.push(`ข้ามซ้ำ ${skippedCount} รายการ`);
      if (errorCount > 0)   parts.push(`ข้อมูลไม่ครบ ${errorCount} รายการ`);

      if (importedCount > 0) showToast(parts.join(' | '), 'success');
      else if (skippedCount > 0) showToast(`พบข้อมูลซ้ำทั้งหมด ${skippedCount} รายการ — ไม่มีรายการใหม่`, 'warning');
      else showToast('ไม่สามารถนำเข้าได้ กรุณาตรวจสอบรูปแบบ Excel', 'error');

    } catch(err) {
      console.error('Excel import error:', err);
      showToast('เกิดข้อผิดพลาดในการอ่านไฟล์ กรุณาตรวจสอบไฟล์อีกครั้ง', 'error');
    }
  };
  reader.readAsArrayBuffer(file);
}
