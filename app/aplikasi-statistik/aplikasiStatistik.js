function kum(a) {
	var b = [0];
	for (i = 0; i < a.length; i++) {
		b[i + 1] = b[i] + a[i];
	}
	b = b.slice(1, a.length);
	return b;
}

function rapikan(a) {
	var b = a.value;
	b = b.trim();
	b = b.replace(/^(?=\n)$|^\s*|\s*$|\n\n+/gm, "");
	while (b.includes(",,")) {
		b = b.replace(/,,/g, ",");
	}
	if (b[b.length - 1] == ",") {
		b = b.slice(0, -1);
	}
	return b;
}

function dynamicColors() {
	var r = Math.floor(Math.random() * 255);
	var g = Math.floor(Math.random() * 255);
	var b = Math.floor(Math.random() * 255);
	return "rgba(" + r + "," + g + "," + b + ", 0.5)";
}

function poolColors(a) {
	var pool = [];
	for (i = 0; i < a; i++) {
		pool.push(dynamicColors());
	}
	return pool;
}
function MasukAplikasi(){
	document.getElementById('post-title').style.display = 'none';
	document.getElementById('kata-pengantar').style.display = 'none';
	document.getElementById('menu-aplikasi').style.display = 'flex';
}

var BanyakKlik = 0;


// const kelompokf = ['Diagram Batang','Histogram','Poligon','Poligon Kumulatif','Ratarata','Median','Modus','Jangkauan','Variansi','Simpangan Baku'];

function main(button) {
	
	var buttonId = button.id;

	const indexOfComma = buttonId.indexOf('=');
	var n = buttonId.slice(0, indexOfComma);
	var x = buttonId.slice(indexOfComma+1);
	
	// for (let i = 0; i < kelompokf.length; i++) {
		// if (kelompokf[i] === x ) {
			// let func1 = x.replace(/\s/g, "");
			// return window[func1](n);
		// } 
		// else {
		// }
	// }
	
	return window[x.replace(/\s/g, "")](n);
}
	
function formData(x){
	
	let func2 = 'hide_'+BanyakKlik.toString()+x.replace(/\s/g, "");
	window[func2] = function() {
		document.getElementById('raise'+y).style.display = "flex";
		document.getElementById("collapse"+y).style.display = "none";
	};
	let func1 = 'raise_'+BanyakKlik.toString()+x.replace(/\s/g, "");
	window[func1] = function() {
		document.getElementById('raise'+y).style.display = "none";
		document.getElementById("collapse"+y).style.display = "flex";
	};

	BanyakKlik = BanyakKlik + 1;
	
	const y = '_'+BanyakKlik.toString()+x.replace(/\s/g, "");

	// Create the main div
	const mainDiv = document.createElement('div');

	// Create the button
	const button = document.createElement('button');
	button.id = 'raise'+y;
	button.className = 'btn btn-link';
	button.style.display = 'none';
	button.innerHTML = 'Klik ke-'+BanyakKlik+' '+x+'<i class="bi bi-three-dots"></i>';

	// Create the inner div for collapsing content
	const collapseDiv = document.createElement('div');
	collapseDiv.className = 'row py-4 border-bottom border-5';
	collapseDiv.id = 'collapse'+y;

	// Create the first column div
	const col1Div = document.createElement('div');
	col1Div.className = 'col-lg-6 col-sm-12 px-5';
	
	const titleParagraph = document.createElement('p');
	titleParagraph.innerHTML = '<span class="h4">'+x+'</span>';
	
	col1Div.appendChild(titleParagraph);


	// Create the form and its elements
	const form = document.createElement('div');
	form.className = 'form-floating';

	const textarea = document.createElement('textarea');
	textarea.className = 'form-control';
	textarea.placeholder = '-';
	textarea.id = 'input'+y;
	textarea.style.height = '150px';
	textarea.autocomplete = 'off';

	const label = document.createElement('label');
	label.setAttribute('for', 'input'+y);
	label.textContent = 'Masukkan data di sini';

	const submitButton = document.createElement('button');
	submitButton.className = 'btn btn-primary';
	submitButton.type = 'submit';
	submitButton.id = BanyakKlik.toString()+'='+x;
	submitButton.textContent = 'Hitung';

	const hideButton = document.createElement('button');
	hideButton.className = 'btn btn-primary';
	hideButton.textContent = 'Sembunyikan';

	const infoParagraph = document.createElement('p');
	infoParagraph.innerHTML = 'Data harus dipisahkan dengan salah satu dari koma (,) atau enter (pindah baris). Pemisahan desimal menggunakan titik (.) bukan koma (,). <br> Klik <kbd>Hitung</kbd> jika data sudah benar.';

	// Append elements to form
	form.appendChild(textarea);
	form.appendChild(label);
	form.appendChild(submitButton);
	form.appendChild(hideButton);
	form.appendChild(infoParagraph);

	// Append form to col1Div
	col1Div.appendChild(form);

	// Create the second column div
	const col2Div = document.createElement('div');
	col2Div.className = 'col-lg-6 col-sm-12 px-5';

	const resultParagraph = document.createElement('p');
	resultParagraph.className = 'text-break';
	resultParagraph.id = 'hasil'+y;
	//resultParagraph.innerHTML = '<span class="h2">'+x+'</span>';

	const tempatDiagramDiv = document.createElement('div');
	tempatDiagramDiv.id = 'tempat'+y;

	const canvas = document.createElement('canvas');
	canvas.id = 'gambar'+y;

	// Append elements to col2Div
	tempatDiagramDiv.appendChild(canvas);
	col2Div.appendChild(resultParagraph);
	col2Div.appendChild(tempatDiagramDiv);

	// Append col1Div and col2Div to collapseDiv
	collapseDiv.appendChild(col1Div);
	collapseDiv.appendChild(col2Div);

	// Append button and collapseDiv to mainDiv
	mainDiv.appendChild(button);
	mainDiv.appendChild(collapseDiv);

	// Append mainDiv to body or any other parent element
	document.getElementById('main').appendChild(mainDiv);
	
	button.onclick = function(){window[func1]();};
	submitButton.onclick = function(){main(this);};
	hideButton.onclick = function(){window[func2]();};

}

function formData2(x){
	
	let func2 = 'hide_'+BanyakKlik.toString()+x.replace(/\s/g, "");
	window[func2] = function() {
		document.getElementById('raise'+y).style.display = "flex";
		document.getElementById("collapse"+y).style.display = "none";
	};
	let func1 = 'raise_'+BanyakKlik.toString()+x.replace(/\s/g, "");
	window[func1] = function() {
		document.getElementById('raise'+y).style.display = "none";
		document.getElementById("collapse"+y).style.display = "flex";
	};

	BanyakKlik = BanyakKlik + 1;
	
	const y = '_'+BanyakKlik.toString()+x.replace(/\s/g, "");

	// Create the main div
	const mainDiv = document.createElement('div');

	// Create the button
	const button = document.createElement('button');
	button.id = 'raise'+y;
	button.className = 'btn btn-link';
	button.style.display = 'none';
	button.innerHTML = 'Klik ke-'+BanyakKlik+' '+x+'<i class="bi bi-three-dots"></i>';

	// Create the inner div for collapsing content
	const collapseDiv = document.createElement('div');
	collapseDiv.className = 'row py-4 border-bottom border-5';
	collapseDiv.id = 'collapse'+y;

	// Create the first column div
	const col1Div = document.createElement('div');
	col1Div.className = 'col-lg-6 col-sm-12 px-5';
	
	const titleParagraph = document.createElement('p');
	titleParagraph.innerHTML = '<span class="h4">'+x+'</span>';
	
	col1Div.appendChild(titleParagraph);


	// Create the form and its elements
	const form = document.createElement('div');
	form.className = 'form-floating';

	const textarea = document.createElement('textarea');
	textarea.className = 'form-control';
	textarea.placeholder = '-';
	textarea.id = 'input'+y;
	textarea.style.height = '150px';
	textarea.autocomplete = 'off';

	const label = document.createElement('label');
	label.setAttribute('for', 'input'+y);
	label.textContent = 'Masukkan data di sini';

	const submitButton = document.createElement('button');
	submitButton.className = 'btn btn-primary';
	submitButton.type = 'submit';
	submitButton.id = BanyakKlik.toString()+'='+x+'Populasi';
	submitButton.textContent = 'Hitung(Populasi)';
	
	const submitButton2 = document.createElement('button');
	submitButton2.className = 'btn btn-primary';
	submitButton2.type = 'submit';
	submitButton2.id = BanyakKlik.toString()+'='+x+'Sampel';
	submitButton2.textContent = 'Hitung(Sampel)';

	const hideButton = document.createElement('button');
	hideButton.className = 'btn btn-primary';
	hideButton.textContent = 'Sembunyikan';

	const infoParagraph = document.createElement('p');
	infoParagraph.innerHTML = 'Data harus dipisahkan dengan salah satu dari koma (,) atau enter (pindah baris). Pemisahan desimal menggunakan titik (.) bukan koma (,). <br> Klik <kbd>Hitung</kbd> jika data sudah benar.';

	// Append elements to form
	form.appendChild(textarea);
	form.appendChild(label);
	form.appendChild(submitButton);
	form.appendChild(submitButton2);
	form.appendChild(hideButton);
	form.appendChild(infoParagraph);

	// Append form to col1Div
	col1Div.appendChild(form);

	// Create the second column div
	const col2Div = document.createElement('div');
	col2Div.className = 'col-lg-6 col-sm-12 px-5';

	const resultParagraph = document.createElement('p');
	resultParagraph.className = 'text-break';
	resultParagraph.id = 'hasil'+y;
	//resultParagraph.innerHTML = '<span class="h2">'+x+'</span>';

	const tempatDiagramDiv = document.createElement('div');
	tempatDiagramDiv.id = 'tempat'+y;

	const canvas = document.createElement('canvas');
	canvas.id = 'gambar'+y;

	// Append elements to col2Div
	tempatDiagramDiv.appendChild(canvas);
	col2Div.appendChild(resultParagraph);
	col2Div.appendChild(tempatDiagramDiv);

	// Append col1Div and col2Div to collapseDiv
	collapseDiv.appendChild(col1Div);
	collapseDiv.appendChild(col2Div);

	// Append button and collapseDiv to mainDiv
	mainDiv.appendChild(button);
	mainDiv.appendChild(collapseDiv);

	// Append mainDiv to body or any other parent element
	document.getElementById('main').appendChild(mainDiv);
	
	button.onclick = function(){window[func1]();};
	submitButton.onclick = function(){main(this);};
	submitButton2.onclick = function(){main(this);};
	hideButton.onclick = function(){window[func2]();};

}

function DiagramBatang(n) {
	var n = '_'+n;
	document.getElementById("hasil"+n+"DiagramBatang").style.display = "none";
	document.getElementById("gambar"+n+"DiagramBatang").remove();
	var tempat = document.getElementById("tempat"+n+"DiagramBatang");
	var gambar = document.createElement("canvas");
	gambar.id = "gambar"+n+"DiagramBatang";
	tempat.appendChild(gambar);
	var a = document.getElementById('input'+n+'DiagramBatang');
	var b = rapikan(a);
	var c = Array.from(b.split(','));
	var d = Array.from(b.split('\n'));
	if (d.length > c.length) {
		var e = d;
	} else {
		var e = c;
	}
	e = e.sort(function(a, b) {
		return a - b
	});
	var f = new Set(e);
	var g = [];
	var iterator = Array.from(f);
	for (let i = 0; i < iterator.length; i++) {
		var pisah = e.filter((x) => x === iterator[i]);
		g[i] = pisah.length;
	}
	document.getElementById("hasil"+n+"DiagramBatang").innerText = "Banyak data " + e.length + "\n ========= \n";
	document.getElementById("hasil"+n+"DiagramBatang").style.display = "flex";
	var xValues = Array.from(f);
	var yValues = g;
	new Chart("gambar"+n+"DiagramBatang", {
		type: "bar",
		data: {
			labels: xValues,
			datasets: [{
				backgroundColor: poolColors(yValues.length),
				borderColor: poolColors(yValues.length),
				data: yValues
			}]
		},
		options: {
			plugins: {
				legend: {
					display: false
				},
				title: {
					display: true,
					text: 'Klik ke'+n+': Diagram Batang'
				}
			}
		}
	});
}

function Histogram(n) {
	var n = '_'+n;

	document.getElementById("hasil"+n+"Histogram").style.display = "none";
	document.getElementById("gambar"+n+"Histogram").remove();
	var tempat = document.getElementById("tempat"+n+"Histogram");
	var gambar = document.createElement("canvas");
	gambar.id = "gambar"+n+"Histogram";
	tempat.appendChild(gambar);
	var a = document.getElementById('input'+n+'Histogram');
	var b = rapikan(a);
	var c = Array.from(b.split(','), Number);
	var d = Array.from(b.split('\n'), Number);
	if (d.length > c.length) {
		var e = d;
	} else {
		var e = c;
	}
	e = e.sort(function(a, b) {
		return a - b
	});
	var nKelas = 1 + (3.3) * Math.log10(e.length);
	nKelas = Math.floor(nKelas);
	var lKelas = Math.round(jStat.range(e) / nKelas);
	var g = jStat.histogram(e, nKelas);
	var f = [];
	var awal = Math.floor(jStat.min(e)) - 0.5;
	for (let i = 0; i < nKelas; i++) {
		f[i] = awal + (lKelas) / 2 + lKelas * i;
	}
	var akhir = f[nKelas - 1] + 0.5;
	document.getElementById("hasil"+n+"Histogram").innerText = "Banyak data " + e.length + "\n Banyak kelas " + nKelas + "\n Panjang kelas " + lKelas + "\n ========= \n";
	document.getElementById("hasil"+n+"Histogram").style.display = "flex";
	var x_vals = f;
	var y_vals = g;
	var data = x_vals.map((k, i) => ({
		x: k,
		y: y_vals[i]
	}));
	var ctx = document.getElementById('gambar'+n+'Histogram');
	var myChart = new Chart(ctx, {
		type: 'bar',
		data: {
			datasets: [{
				label: 'Banyaknya',
				data: data,
				barPercentage: 1,
				categoryPercentage: 1,
				borderRadius: 5
			}]
		},
		options: {
			scales: {
				x: {
					//beginAtZero: true,
					type: 'linear',
					offset: false,
					grid: {
						offset: false
					},
					ticks: {
						stepSize: lKelas
					},
					title: {
						display: true,
						text: 'Nilai',
						font: {
							size: 14
						}
					}
				},
				y: {
					title: {
						display: true,
						text: 'Frekuensi',
						font: {
							size: 14
						}
					}
				}
			},
			plugins: {
				legend: {
					display: false,
				},
				tooltip: {
					callbacks: {
						title: (items) => {
							if (!items.length) {
								return "";
							}
							var item = items[0];
							var x = item.parsed.x;
							var min = x - lKelas / 2;
							var max = x + lKelas / 2;
							return "Nilai: " + min + " - " + max;
						}
					}
				}
			}
		}
	});
}

function Poligon(n) {
	var n = '_'+n;

	document.getElementById("hasil"+n+"Poligon").style.display = "none";
	document.getElementById("gambar"+n+"Poligon").remove();
	var tempat = document.getElementById("tempat"+n+"Poligon");
	var gambar = document.createElement("canvas");
	gambar.id = "gambar"+n+"Poligon";
	tempat.appendChild(gambar);
	var a = document.getElementById('input'+n+'Poligon');
	var b = rapikan(a);
	var c = Array.from(b.split(','), Number);
	var d = Array.from(b.split('\n'), Number);
	if (d.length > c.length) {
		var e = d;
	} else {
		var e = c;
	}
	e = e.sort(function(a, b) {
		return a - b
	});
	var nKelas = 1 + (3.3) * Math.log10(e.length);
	nKelas = Math.floor(nKelas);
	var lKelas = Math.round(jStat.range(e) / nKelas);
	var g = jStat.histogram(e, nKelas);
	var f = [];
	var awal = Math.floor(jStat.min(e)) - 0.5;
	for (let i = 0; i < nKelas; i++) {
		f[i] = awal + (lKelas) / 2 + lKelas * i;
	}
	var akhir = f[nKelas - 1] + 0.5;
	document.getElementById("hasil"+n+"Poligon").innerText = "Banyak data " + e.length + "\n Banyak kelas " + nKelas + "\n Panjang kelas " + lKelas + "\n ========= \n";
	document.getElementById("hasil"+n+"Poligon").style.display = "flex";
	var x_vals = f;
	var y_vals = g;
	var data = x_vals.map((k, i) => ({
		x: k,
		y: y_vals[i]
	}));
	var ctx = document.getElementById('gambar'+n+'Poligon');
	var myChart = new Chart(ctx, {
		type: 'line',
		data: {
			datasets: [{
				label: 'Banyaknya',
				data: data,
				barPercentage: 1,
				categoryPercentage: 1,
				borderRadius: 5
			}]
		},
		options: {
			scales: {
				x: {
					//beginAtZero: true,
					type: 'linear',
					offset: false,
					grid: {
						offset: false
					},
					ticks: {
						stepSize: lKelas
					},
					title: {
						display: true,
						text: 'Nilai',
						font: {
							size: 14
						}
					}
				},
				y: {
					title: {
						display: true,
						text: 'Frekuensi',
						font: {
							size: 14
						}
					}
				}
			},
			plugins: {
				legend: {
					display: false,
				},
				tooltip: {
					callbacks: {
						title: (items) => {
							if (!items.length) {
								return "";
							}
							var item = items[0];
							var x = item.parsed.x;
							var min = x - lKelas / 2;
							var max = x + lKelas / 2;
							return "Nilai: " + min + " - " + max;
						}
					}
				}
			}
		}
	});
}

function PoligonKumulatif(n) {
	var n = '_'+n;

	document.getElementById("hasil"+n+"PoligonKumulatif").style.display = "none";
	document.getElementById("gambar"+n+"PoligonKumulatif").remove();
	var tempat = document.getElementById("tempat"+n+"PoligonKumulatif");
	var gambar = document.createElement("canvas");
	gambar.id = "gambar"+n+"PoligonKumulatif";
	tempat.appendChild(gambar);
	var a = document.getElementById('input'+n+'PoligonKumulatif');
	var b = rapikan(a);
	var c = Array.from(b.split(','), Number);
	var d = Array.from(b.split('\n'), Number);
	if (d.length > c.length) {
		var e = d;
	} else {
		var e = c;
	}
	e = e.sort(function(a, b) {
		return a - b
	});
	var nKelas = 1 + (3.3) * Math.log10(e.length);
	nKelas = Math.floor(nKelas);
	var lKelas = Math.round(jStat.range(e) / nKelas);
	var g = jStat.histogram(e, nKelas);
	console.log("cek g " + g);
	g = kum(g);
	console.log("cek g " + g);
	var f = [];
	var awal = Math.floor(jStat.min(e)) - 0.5;
	for (let i = 0; i < nKelas; i++) {
		f[i] = awal + (lKelas) / 2 + lKelas * i;
	}
	var akhir = f[nKelas - 1] + 0.5;
	document.getElementById("hasil"+n+"PoligonKumulatif").innerText = "Banyak data " + e.length + "\n Banyak kelas " + nKelas + "\n Panjang kelas " + lKelas + "\n ========= \n";
	document.getElementById("hasil"+n+"PoligonKumulatif").style.display = "flex";
	var x_vals = f;
	var y_vals = g;
	var data = x_vals.map((k, i) => ({
		x: k,
		y: y_vals[i]
	}));
	var ctx = document.getElementById('gambar'+n+'PoligonKumulatif');
	var myChart = new Chart(ctx, {
		type: 'line',
		data: {
			datasets: [{
				label: 'Banyaknya',
				data: data,
				barPercentage: 1,
				categoryPercentage: 1,
				borderRadius: 5
			}]
		},
		options: {
			scales: {
				x: {
					//beginAtZero: true,
					type: 'linear',
					offset: false,
					grid: {
						offset: false
					},
					ticks: {
						stepSize: lKelas
					},
					title: {
						display: true,
						text: 'Nilai',
						font: {
							size: 14
						}
					}
				},
				y: {
					title: {
						display: true,
						text: 'Frekuensi',
						font: {
							size: 14
						}
					}
				}
			},
			plugins: {
				legend: {
					display: false,
				},
				tooltip: {
					callbacks: {
						title: (items) => {
							if (!items.length) {
								return "";
							}
							var item = items[0];
							var x = item.parsed.x;
							var min = x - lKelas / 2;
							var max = x + lKelas / 2;
							return "Nilai: " + min + " - " + max;
						}
					}
				}
			}
		}
	});
}

function Ratarata(n) {
	var n = '_'+n;

	document.getElementById("hasil"+n+"Ratarata").style.display = "none";
	var a = document.getElementById('input'+n+'Ratarata');
	var b = rapikan(a);
	var c = Array.from(b.split(','), Number);
	var d = Array.from(b.split('\n'), Number);
	if (d.length > c.length) {
		var e = jStat.mean(d);
		var f = d;
	} else {
		var e = jStat.mean(c);
		var f = c;
	}
	document.getElementById("hasil"+n+"Ratarata").innerText = "Data " + f + "\n Banyak data " + f.length + "\n ========= \n Rata-rata " + e;
	document.getElementById("hasil"+n+"Ratarata").style.display = "flex";
}

function Median(n) {
	var n = '_'+n;

	document.getElementById("hasil"+n+"Median").style.display = "none";
	var a = document.getElementById('input'+n+'Median');
	var b = rapikan(a);
	var c = Array.from(b.split(','), Number);
	var d = Array.from(b.split('\n'), Number);
	if (d.length > c.length) {
		var e = jStat.median(d);
		var f = d;
	} else {
		var e = jStat.median(c);
		var f = c;
	}
	document.getElementById("hasil"+n+"Median").innerText = "Data asli " + f + "\n Data terurut " + f.sort(function(a, b) {
		return a - b
	}) + "\n Banyak data " + f.length + "\n ========= \n Median " + e;
	document.getElementById("hasil"+n+"Median").style.display = "flex";
}

function Modus(n) {
	var n = '_'+n;
	
	document.getElementById("hasil"+n+"Modus").style.display = "none";
	var a = document.getElementById('input'+n+'Modus');
	var b = rapikan(a);
	var c = Array.from(b.split(','), Number);
	var d = Array.from(b.split('\n'), Number);
	if (d.length > c.length) {
		var e = jStat.mode(d);
		var f = d;
	} else {
		var e = jStat.mode(c);
		var f = c;
	}
	document.getElementById("hasil"+n+"Modus").innerText = "Data asli " + f + "\n Data terurut " + f.sort(function(a, b) {
		return a - b
	}) + "\n Banyak data " + f.length + "\n ========= \n Modus " + e;
	document.getElementById("hasil"+n+"Modus").style.display = "flex";
}

function Jangkauan(n) {
	var n = '_'+n;

	document.getElementById("hasil"+n+"Jangkauan").style.display = "none";
	var a = document.getElementById('input'+n+'Jangkauan');
	var b = rapikan(a);
	var c = Array.from(b.split(','), Number);
	var d = Array.from(b.split('\n'), Number);
	if (d.length > c.length) {
		var e = jStat.range(d);
		var f = d;
	} else {
		var e = jStat.range(c);
		var f = c;
	}
	document.getElementById("hasil"+n+"Jangkauan").innerText = "Data asli " + f + "\n Data terurut " + f.sort(function(a, b) {
		return a - b
	}) + "\n Banyak data " + f.length + "\n ========= \n Jangkauan " + e;
	document.getElementById("hasil"+n+"Jangkauan").style.display = "flex";
}

function VariansiSampel(n) {
	var n = '_'+n;

	document.getElementById("hasil"+n+"Variansi").style.display = "none";
	var a = document.getElementById('input'+n+'Variansi');
	var b = rapikan(a);
	var c = Array.from(b.split(','), Number);
	var d = Array.from(b.split('\n'), Number);
	if (d.length > c.length) {
		var e = d;
	} else {
		var e = c;
	}
	var f = jStat.variance(e, true);
	document.getElementById("hasil"+n+"Variansi").innerText = "Data asli " + e + "\n Data terurut " + e.sort(function(a, b) {
		return a - b
	}) + "\n Banyak data " + e.length + "\n ========= \n Variansi Sampel " + f;
	document.getElementById("hasil"+n+"Variansi").style.display = "flex";
}

function VariansiPopulasi(n) {
	var n = '_'+n;

	document.getElementById("hasil"+n+"Variansi").style.display = "none";
	var a = document.getElementById('input'+n+'Variansi');
	var b = rapikan(a);
	var c = Array.from(b.split(','), Number);
	var d = Array.from(b.split('\n'), Number);
	if (d.length > c.length) {
		var e = d;
	} else {
		var e = c;
	}
	var f = jStat.variance(e);
	document.getElementById("hasil"+n+"Variansi").innerText = "Data asli " + e + "\n Data terurut " + e.sort(function(a, b) {
		return a - b
	}) + "\n Banyak data " + e.length + "\n ========= \n Variansi Populasi " + f;
	document.getElementById("hasil"+n+"Variansi").style.display = "flex";
}

function SimpanganBakuSampel(n) {
	var n = '_'+n;

	document.getElementById("hasil"+n+"SimpanganBaku").style.display = "none";
	var a = document.getElementById('input'+n+'SimpanganBaku');
	var b = rapikan(a);
	var c = Array.from(b.split(','), Number);
	var d = Array.from(b.split('\n'), Number);
	if (d.length > c.length) {
		var e = d;
	} else {
		var e = c;
	}
	var f = jStat.variance(e, true);
	f = Math.sqrt(f);
	document.getElementById("hasil"+n+"SimpanganBaku").innerText = "Data asli " + e + "\n Data terurut " + e.sort(function(a, b) {
		return a - b
	}) + "\n Banyak data " + e.length + "\n ========= \n Simpangan Baku Sampel " + f;
	document.getElementById("hasil"+n+"SimpanganBaku").style.display = "flex";
}

function SimpanganBakuPopulasi(n) {
	var n = '_'+n;

	document.getElementById("hasil"+n+"SimpanganBaku").style.display = "none";
	var a = document.getElementById('input'+n+'SimpanganBaku');
	var b = rapikan(a);
	var c = Array.from(b.split(','), Number);
	var d = Array.from(b.split('\n'), Number);
	if (d.length > c.length) {
		var e = d;
	} else {
		var e = c;
	}
	var f = jStat.variance(e);
	f = Math.sqrt(f);
	document.getElementById("hasil"+n+"SimpanganBaku").innerText = "Data asli " + e + "\n Data terurut " + e.sort(function(a, b) {
		return a - b
	}) + "\n Banyak data " + e.length + "\n ========= \n Simpangan Baku Populasi " + f;
	document.getElementById("hasil"+n+"SimpanganBaku").style.display = "flex";
}
