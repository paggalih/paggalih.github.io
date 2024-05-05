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

function hideDiagramBatang() {
	document.getElementById("_raise_diagram_batang").style.display = "flex";
	document.getElementById("collapseDiagramBatang").style.display = "none";
}

function raiseDiagramBatang() {
	document.getElementById("_raise_diagram_batang").style.display = "none";
	document.getElementById("collapseDiagramBatang").style.display = "flex";
}

function diagramBatang() {
	document.getElementById("hasilDiagramBatang").style.display = "none";
	document.getElementById("gambarDiagramBatang").remove();
	var tempat = document.getElementById("tempatDiagramBatang");
	var gambar = document.createElement("canvas");
	gambar.id = "gambarDiagramBatang";
	tempat.appendChild(gambar);
	var a = document.getElementById('inputDiagramBatang');
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
	document.getElementById("hasilDiagramBatang").innerText = "Banyak data " + e.length + "\n ========= \n";
	document.getElementById("hasilDiagramBatang").style.display = "flex";
	var xValues = Array.from(f);
	var yValues = g;
	new Chart("gambarDiagramBatang", {
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
					text: 'Diagram Batang'
				}
			}
		}
	});
	console.log("berikan catatan disini");
}

function hideHistogram() {
	document.getElementById("_raise_histogram").style.display = "flex";
	document.getElementById("collapseHistogram").style.display = "none";
}

function raiseHistogram() {
	document.getElementById("_raise_histogram").style.display = "none";
	document.getElementById("collapseHistogram").style.display = "flex";
}

function histogram() {
	document.getElementById("hasilHistogram").style.display = "none";
	document.getElementById("gambarHistogram").remove();
	var tempat = document.getElementById("tempatHistogram");
	var gambar = document.createElement("canvas");
	gambar.id = "gambarHistogram";
	tempat.appendChild(gambar);
	var a = document.getElementById('inputHistogram');
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
	document.getElementById("hasilHistogram").innerText = "Banyak data " + e.length + "\n Banyak kelas " + nKelas + "\n Panjang kelas " + lKelas + "\n ========= \n";
	document.getElementById("hasilHistogram").style.display = "flex";
	var x_vals = f;
	var y_vals = g;
	var data = x_vals.map((k, i) => ({
		x: k,
		y: y_vals[i]
	}));
	var ctx = document.getElementById('gambarHistogram');
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
	console.log("catat perubahan disini");
}

function hidePoligon() {
	document.getElementById("_raise_poligon").style.display = "flex";
	document.getElementById("collapsePoligon").style.display = "none";
}

function raisePoligon() {
	document.getElementById("_raise_poligon").style.display = "none";
	document.getElementById("collapsePoligon").style.display = "flex";
}

function poligon() {
	document.getElementById("hasilPoligon").style.display = "none";
	document.getElementById("gambarPoligon").remove();
	var tempat = document.getElementById("tempatPoligon");
	var gambar = document.createElement("canvas");
	gambar.id = "gambarPoligon";
	tempat.appendChild(gambar);
	var a = document.getElementById('inputPoligon');
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
	document.getElementById("hasilPoligon").innerText = "Banyak data " + e.length + "\n Banyak kelas " + nKelas + "\n Panjang kelas " + lKelas + "\n ========= \n";
	document.getElementById("hasilPoligon").style.display = "flex";
	var x_vals = f;
	var y_vals = g;
	var data = x_vals.map((k, i) => ({
		x: k,
		y: y_vals[i]
	}));
	var ctx = document.getElementById('gambarPoligon');
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
	console.log("Poligon: catat perubahan disini");
}

function hidePoligonKum() {
	document.getElementById("_raise_poligon_kum").style.display = "flex";
	document.getElementById("collapsePoligonKum").style.display = "none";
}

function raisePoligonKum() {
	document.getElementById("_raise_poligon_kum").style.display = "none";
	document.getElementById("collapsePoligonKum").style.display = "flex";
}

function poligonKum() {
	document.getElementById("hasilPoligonKum").style.display = "none";
	document.getElementById("gambarPoligonKum").remove();
	var tempat = document.getElementById("tempatPoligonKum");
	var gambar = document.createElement("canvas");
	gambar.id = "gambarPoligonKum";
	tempat.appendChild(gambar);
	var a = document.getElementById('inputPoligonKum');
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
	document.getElementById("hasilPoligonKum").innerText = "Banyak data " + e.length + "\n Banyak kelas " + nKelas + "\n Panjang kelas " + lKelas + "\n ========= \n";
	document.getElementById("hasilPoligonKum").style.display = "flex";
	var x_vals = f;
	var y_vals = g;
	var data = x_vals.map((k, i) => ({
		x: k,
		y: y_vals[i]
	}));
	var ctx = document.getElementById('gambarPoligonKum');
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
	console.log("Poligon Kumulatif: catat perubahan disini");
}

function hideRataRata() {
	document.getElementById("_raise_rata_rata").style.display = "flex";
	document.getElementById("collapseRatarata").style.display = "none";
}

function raiseRataRata() {
	document.getElementById("_raise_rata_rata").style.display = "none";
	document.getElementById("collapseRatarata").style.display = "flex";
}

function rataRata() {
	document.getElementById("hasilRatarata").style.display = "none";
	var a = document.getElementById('inputRatarata');
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
	document.getElementById("hasilRatarata").innerText = "Data " + f + "\n Banyak data " + f.length + "\n ========= \n Rata-rata " + e;
	document.getElementById("hasilRatarata").style.display = "flex";
}

function hideMedian() {
	document.getElementById("_raise_median").style.display = "flex";
	document.getElementById("collapseMedian").style.display = "none";
}

function raiseMedian() {
	document.getElementById("_raise_median").style.display = "none";
	document.getElementById("collapseMedian").style.display = "flex";
}

function median() {
	document.getElementById("hasilMedian").style.display = "none";
	var a = document.getElementById('inputMedian');
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
	document.getElementById("hasilMedian").innerText = "Data asli " + f + "\n Data terurut " + f.sort(function(a, b) {
		return a - b
	}) + "\n Banyak data " + f.length + "\n ========= \n Median " + e;
	document.getElementById("hasilMedian").style.display = "flex";
}

function hideModus() {
	document.getElementById("_raise_modus").style.display = "flex";
	document.getElementById("collapseModus").style.display = "none";
}

function raiseModus() {
	document.getElementById("_raise_modus").style.display = "none";
	document.getElementById("collapseModus").style.display = "flex";
}

function modus() {
	document.getElementById("hasilModus").style.display = "none";
	var a = document.getElementById('inputModus');
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
	document.getElementById("hasilModus").innerText = "Data asli " + f + "\n Data terurut " + f.sort(function(a, b) {
		return a - b
	}) + "\n Banyak data " + f.length + "\n ========= \n Modus " + e;
	document.getElementById("hasilModus").style.display = "flex";
}

function hideJangkauan() {
	document.getElementById("_raise_jangkauan").style.display = "flex";
	document.getElementById("collapseJangkauan").style.display = "none";
}

function raiseJangkauan() {
	document.getElementById("_raise_jangkauan").style.display = "none";
	document.getElementById("collapseJangkauan").style.display = "flex";
}

function jangkauan() {
	document.getElementById("hasilJangkauan").style.display = "none";
	var a = document.getElementById('inputJangkauan');
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
	document.getElementById("hasilJangkauan").innerText = "Data asli " + f + "\n Data terurut " + f.sort(function(a, b) {
		return a - b
	}) + "\n Banyak data " + f.length + "\n ========= \n Jangkauan " + e;
	document.getElementById("hasilJangkauan").style.display = "flex";
}

function hideVariansi() {
	document.getElementById("_raise_variansi").style.display = "flex";
	document.getElementById("collapseVariansi").style.display = "none";
}

function raiseVariansi() {
	document.getElementById("_raise_variansi").style.display = "none";
	document.getElementById("collapseVariansi").style.display = "flex";
}

function variansiSampel() {
	document.getElementById("hasilVariansi").style.display = "none";
	var a = document.getElementById('inputVariansi');
	var b = rapikan(a);
	var c = Array.from(b.split(','), Number);
	var d = Array.from(b.split('\n'), Number);
	if (d.length > c.length) {
		var e = d;
	} else {
		var e = c;
	}
	var f = jStat.variance(e, true);
	document.getElementById("hasilVariansi").innerText = "Data asli " + e + "\n Data terurut " + e.sort(function(a, b) {
		return a - b
	}) + "\n Banyak data " + e.length + "\n ========= \n Variansi Sampel " + f;
	document.getElementById("hasilVariansi").style.display = "flex";
}

function variansiPopulasi() {
	document.getElementById("hasilVariansi").style.display = "none";
	var a = document.getElementById('inputVariansi');
	var b = rapikan(a);
	var c = Array.from(b.split(','), Number);
	var d = Array.from(b.split('\n'), Number);
	if (d.length > c.length) {
		var e = d;
	} else {
		var e = c;
	}
	var f = jStat.variance(e);
	document.getElementById("hasilVariansi").innerText = "Data asli " + e + "\n Data terurut " + e.sort(function(a, b) {
		return a - b
	}) + "\n Banyak data " + e.length + "\n ========= \n Variansi Populasi " + f;
	document.getElementById("hasilVariansi").style.display = "flex";
}

function hideSimpanganBaku() {
	document.getElementById("_raise_simpangan_baku").style.display = "flex";
	document.getElementById("collapseSimpanganBaku").style.display = "none";
}

function raiseSimpanganBaku() {
	document.getElementById("_raise_simpangan_baku").style.display = "none";
	document.getElementById("collapseSimpanganBaku").style.display = "flex";
}

function simpanganBakuSampel() {
	document.getElementById("hasilSimpanganBaku").style.display = "none";
	var a = document.getElementById('inputSimpanganBaku');
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
	document.getElementById("hasilSimpanganBaku").innerText = "Data asli " + e + "\n Data terurut " + e.sort(function(a, b) {
		return a - b
	}) + "\n Banyak data " + e.length + "\n ========= \n Simpangan Baku Sampel " + f;
	document.getElementById("hasilSimpanganBaku").style.display = "flex";
}

function simpanganBakuPopulasi() {
	document.getElementById("hasilSimpanganBaku").style.display = "none";
	var a = document.getElementById('inputSimpanganBaku');
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
	document.getElementById("hasilSimpanganBaku").innerText = "Data asli " + e + "\n Data terurut " + e.sort(function(a, b) {
		return a - b
	}) + "\n Banyak data " + e.length + "\n ========= \n Simpangan Baku Populasi " + f;
	document.getElementById("hasilSimpanganBaku").style.display = "flex";
}
