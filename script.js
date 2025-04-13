document.addEventListener("DOMContentLoaded", () => {
  const surahListEl = document.getElementById("surah-list");
  const searchInput = document.getElementById("search");

  fetch("quran/quran-id.json")
    .then(res => res.json())
    .then(data => {
      const surahs = Object.values(data.data);

      function displaySurahList(list) {
        surahListEl.innerHTML = "";
        list.forEach((surah, index) => {
          const div = document.createElement("div");
          div.classList.add("surah");
          div.innerHTML = `
            <strong>${index + 1}. ${surah.name.transliteration.id}</strong><br>
            <small>${surah.name.translation.id}</small>
          `;
          div.onclick = () => {
            localStorage.setItem("selectedSurah", JSON.stringify(surah));
            window.location.href = "surah.html";
          };
          surahListEl.appendChild(div);
        });
      }

      displaySurahList(surahs);

      searchInput.addEventListener("input", () => {
        const keyword = searchInput.value.toLowerCase();
        const filtered = surahs.filter(surah =>
          surah.name.transliteration.id.toLowerCase().includes(keyword)
        );
        displaySurahList(filtered);
      });
    });
});
