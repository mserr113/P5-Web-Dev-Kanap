fetch("../back/package.json")
.then(res => res.json())
.then(data => console.log(data))