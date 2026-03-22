// Hàm phân tích văn bản để tìm ra cột Tiếng Anh, Cột Tiếng Việt
export const analyzeCSVData = (csvText) => {
  return new Promise((resolve) => {
    // Giả lập AI processing (1s)
    setTimeout(() => {
      const lines = csvText.split('\n').filter(line => line.trim() !== '');
      if (lines.length === 0) return resolve([]);
      
      const results = [];
      const vietnameseMarksRegex = /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]/i;

      // Nhận diện Header (thường là dòng đầu)
      // Bóc tách đơn giản bằng dấu phẩy
      for (let i = 0; i < lines.length; i++) {
        // Regex tách trường CSV cơ bản (bỏ qua dấu phẩy trong ngoặc kép)
        const row = lines[i].match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g) || [];
        const cleanRow = row.map(cell => cell.replace(/^"|"$/g, '').trim());
        
        if (cleanRow.length < 2) continue; // Phải có ít nhất 2 cột

        // Phân tích: Đâu là cột En, đâu là cột Vi
        let enWord = '';
        let viMeaning = '';

        for (const cell of cleanRow) {
          if (vietnameseMarksRegex.test(cell)) {
            // Có dấu tiếng Việt -> Chắc chắn là Nghĩa
            viMeaning = cell;
          } else if (/^[a-zA-Z\s-]+$/.test(cell)) {
            // Chỉ chứa chữ cái latin -> Khả năng cao là Từ Tiếng Anh
            enWord = cell;
          }
        }

        // Nếu phân tích thành công
        if (enWord && viMeaning) {
          results.push({
            id: Date.now() + i,
            word: enWord.toLowerCase(),
            meaning: viMeaning,
            ipa: '', // AI sẽ scrape thêm
            type: 'Tự động nhập',
            examples: [],
            image: ''
          });
        }
      }
      resolve(results);
    }, 1500); 
  });
};

// Gọi Dictionary API (Free) để lấy dữ liệu 
export const fetchWordData = async (word) => {
  try {
    const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(word)}`);
    if (!res.ok) throw new Error("Word not found");
    const data = await res.json();
    
    const entry = data[0];
    const ipa = entry.phonetics.find(p => p.text)?.text || entry.phonetic || '';
    
    // Tìm Type và Meaning
    let type = '';
    let meaningEn = '';
    let examples = [];

    if (entry.meanings && entry.meanings.length > 0) {
      type = entry.meanings[0].partOfSpeech;
      const def = entry.meanings[0].definitions[0];
      meaningEn = def.definition;
      if (def.example) {
        examples.push(def.example);
      }
    }

    // Lấy ảnh ngẫu nhiên từ Unsplash (Placeholder minh họa tự động)
    const image = `https://source.unsplash.com/400x300/?${encodeURIComponent(word)}`;

    return {
      word: entry.word,
      ipa,
      type,
      meaning: meaningEn, // Nghĩa tiếng Anh
      examples,
      image,
      audio: entry.phonetics.find(p => p.audio)?.audio || ''
    };
  } catch (err) {
    console.error(err);
    return null;
  }
};
