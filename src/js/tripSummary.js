 export function summaryRoute(idE, start, end) {
  const startOfRoute =start;
  const endOfRoute = end;
  const elementContainer = idE;

  if (startOfRoute === null || endOfRoute === null || elementContainer ===null){
 return (console.log("ошибка в tripSummery"))
  }
   
  const line =`
      <li class="section-trip-summary__route-list-item">
        <span class="section-trip-summary__route-list-marker"></span>
        <span class="section-trip-summary__route-list-city">${startOfRoute}</span>
        <span class="section-trip-summary__route-list-line"></span>
        <span class="section-trip-summary__route-list-meta">СТАРТ</span>
      </li>
      <li class="section-trip-summary__route-list-item">
        <span class="section-trip-summary__route-list-marker"></span>
        <span class="section-trip-summary__route-list-city">${endOfRoute}</span>
        <span class="section-trip-summary__route-list-line"></span>
        <span class="section-trip-summary__route-list-meta">ФИНИШ</span>
      </li>
    `

    elementContainer.innerHTML= line;
}