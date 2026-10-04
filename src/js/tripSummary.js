function summaryRoute(idE, start, end) {
    
    return `
      <li class="route-item ${itemClass}">
        <span class="route-marker"></span>
        <span class="route-city">${point.name}</span>
        <span class="route-meta">${metaText}</span>
      </li>
    `;
}