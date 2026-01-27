  let pdfs = [];
    let currentPreview = null;

    function addPDF() {
      const file = document.getElementById("pdfUpload").files[0];
      const name = document.getElementById("pdfName").value.trim();
      if (!file || !name) {
        alert("Please select a PDF and enter a name!");
        return;
      }
      const url = URL.createObjectURL(file);
      pdfs.push({ name, file, url });
      document.getElementById("pdfUpload").value = "";
      document.getElementById("pdfName").value = "";
      renderPDFs(pdfs);
    }

    function renderPDFs(list) {
      const pdfList = document.getElementById("pdfList");
      pdfList.innerHTML = "";
      list.forEach((pdf, index) => {
        const pdfDiv = document.createElement("div");
        pdfDiv.classList.add("pdf-container");
        pdfDiv.innerHTML = `
          <p><strong>${pdf.name}</strong></p>
          <div class="btn-group">
            <a href="${pdf.url}" download="${pdf.file.name}">
              <button class="download-btn">⬇ Download</button>
            </a>
            <button class="preview-btn" onclick="togglePreview('${pdf.url}')">👁 Preview</button>
            <button class="delete-btn" onclick="deletePDF(${index})">🗑 Delete</button>
          </div>
        `;
        pdfList.appendChild(pdfDiv);
      });
    }

    function deletePDF(index) {
      pdfs.splice(index, 1);
      renderPDFs(pdfs);
    }

    function togglePreview(url) {
      if (currentPreview && currentPreview.src === url) {
        currentPreview.remove();
        currentPreview = null;
      } else {
        if (currentPreview) currentPreview.remove();
        const frame = document.createElement("iframe");
        frame.src = url;
        frame.classList.add("preview-frame");
        document.getElementById("pdfList").appendChild(frame);
        currentPreview = frame;
      }
    }

    function searchPDFs() {
      const query = document.getElementById("searchInput").value.toLowerCase();
      const filtered = pdfs.filter(pdf => pdf.name.toLowerCase().includes(query));
      renderPDFs(filtered);
    }

    function toggleMode() {
      document.body.classList.toggle("dark");
    }

    function renderPDFs(list) {
  const pdfList = document.getElementById("pdfList");
  pdfList.innerHTML = "";
  list.forEach((pdf, index) => {
    const pdfDiv = document.createElement("div");
    pdfDiv.classList.add("pdf-container");
    pdfDiv.innerHTML = `
      <p><strong>${pdf.name}</strong></p>
      <div class="btn-group">
        <a href="${pdf.url}" download="${pdf.file.name}">
          <button class="download-btn">⬇ Download</button>
        </a>
        <button class="preview-btn" onclick="togglePreview('${pdf.url}')">👁 Preview</button>
        <button class="delete-btn" onclick="deletePDF(${index})">🗑 Delete</button>
      </div>
    `;
    pdfList.appendChild(pdfDiv);
  });
}
