var color = Chart.helpers.color;
		var timeSlot = [];
		var distanceMon = [];
		var distanceTue = [];
		var distanceWed = [];
		var distanceThu = [];
		var distanceFri = [];
		var elementID =0;
		function UploadCSV() {
        var csvFileUpload = document.getElementById("csvFileUpload");
        var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.csv|.txt)$/;
        if (regex.test(csvFileUpload.value.toLowerCase())) {
            if (typeof (FileReader) != "undefined") {
                var reader = new FileReader();
                reader.onload = function (e) {
                    var table = document.createElement("table");
                    var rows = e.target.result.split("\n");
                    for (var i = 0; i < rows.length; i++) {
                        var row = table.insertRow(-1);
							//document.write(row.value);
                        var cells = rows[i].split(",");
                        for (var j = 0; j < cells.length; j++) {
                            //var cell = row.insertCell(-1);
                            //cell.innerHTML = cells[j];
							timeSlot[elementID] = cells[j];
							j++;
							distanceMon[elementID] = cells[j];
							j++;
							distanceTue[elementID] = cells[j];
							j++;
							distanceWed[elementID] = cells[j];
							j++;
							distanceThu[elementID] = cells[j];
							j++;
							distanceFri[elementID] = cells[j];
							elementID++;
                        }
                    }
					
                    var dvTable = document.getElementById("dvTable");
                    dvTable.innerHTML = "";
                    dvTable.appendChild(table);
                }
                reader.readAsText(csvFileUpload.files[0]);
            } else {
                alert("This browser does not support HTML5.");
            }
        } else {
            alert("Please upload a valid CSV file.");
        }
    }



/*=========================================================================================*/
		var barChartData = {
			labels: timeSlot,
			datasets: [{
				label: 'Monday',
				backgroundColor: color(window.chartColors.red).alpha(0.5).rgbString(),
				borderColor: window.chartColors.red,
				borderWidth: 1,
				data: distanceMon
			}, {
				label: 'Tuesday',
				backgroundColor: color(window.chartColors.blue).alpha(0.5).rgbString(),
				borderColor: window.chartColors.blue,
				borderWidth: 1,
				data: distanceTue
			}, {
				label: 'Wednesday',
				backgroundColor: color(window.chartColors.yellow).alpha(0.5).rgbString(),
				borderColor: window.chartColors.yellow,
				borderWidth: 1,
				data: distanceWed
			}, {
				label: 'Thursday',
				backgroundColor: color(window.chartColors.green).alpha(0.5).rgbString(),
				borderColor: window.chartColors.green,
				borderWidth: 1,
				data: distanceThu
			}, {
				label: 'Friday',
				backgroundColor: color(window.chartColors.purple).alpha(0.5).rgbString(),
				borderColor: window.chartColors.purple,
				borderWidth: 1,
				data: distanceFri
			}]
		};
		window.onload = function() {
			var ctx = document.getElementById('canvas').getContext('2d');
			window.myBar = new Chart(ctx, {
				type: 'bar',
				data: barChartData,
				options: {
					responsive: true,
					legend: {
						position: 'top',
					},
					title: {
						display: true,
						text: 'Pattern Analysis Chart'
					}
				}
			});
		};
		document.getElementById('randomizeData').addEventListener('click', function() {
			var zero = Math.random() < 0.2 ? true : false;
			barChartData.datasets.forEach(function(dataset) {
				dataset.data = dataset.data.map(function() {
					return zero ? 0.0 : randomScalingFactor();
				});
			});
			window.myBar.update();
		});
		var colorNames = Object.keys(window.chartColors);
		document.getElementById('addDataset').addEventListener('click', function() {
			var colorName = colorNames[barChartData.datasets.length % colorNames.length];
			var dsColor = window.chartColors[colorName];
			var newDataset = {
				label: 'Dataset ' + (barChartData.datasets.length + 1),
				backgroundColor: color(dsColor).alpha(0.5).rgbString(),
				borderColor: dsColor,
				borderWidth: 1,
				data: []
			};
			for (var index = 0; index < barChartData.labels.length; ++index) {
				newDataset.data.push(randomScalingFactor());
			}
			barChartData.datasets.push(newDataset);
			window.myBar.update();
		});
		document.getElementById('addData').addEventListener('click', function() {
			if (barChartData.datasets.length > 0) {
				var month = timeSlot[barChartData.labels.length % timeSlot.length];
				barChartData.labels.push(month);
				for (var index = 0; index < barChartData.datasets.length; ++index) {
					// window.myBar.addData(randomScalingFactor(), index);
					barChartData.datasets[index].data.push(randomScalingFactor());
				}
				window.myBar.update();
			}
		});
		document.getElementById('removeDataset').addEventListener('click', function() {
			barChartData.datasets.pop();
			window.myBar.update();
		});
		document.getElementById('removeData').addEventListener('click', function() {
			barChartData.labels.splice(-1, 1); // remove the label first
			barChartData.datasets.forEach(function(dataset) {
				dataset.data.pop();
			});
			window.myBar.update();
		});