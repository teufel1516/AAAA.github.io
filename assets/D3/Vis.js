

let projection = d3.geoMercator()
	.scale(750)
	.translate([395, 220])
	.center([120,25]);

const margin = {top: 10, right: 30, bottom: 30, left: 40},
    width = 800
    height = 450;
    
let epsJson = {};

let geoGenerator = d3.geoPath()

	.projection(projection);
	
function update(geojson) {
    console.log(geojson);
	let u = d3.select('#content g.map')
		.selectAll('path')
		.data(geojson.features);
	u.enter()
		.append('path')
		.attr('d', geoGenerator)
		//.on('mouseover', handleMouseover);
}

d3.json('assets/D3/ne_50m_coastline.geojson')
	.then(function(json) {
		update(json)
	});
	
	


// read data
// Add a "cliff edge" to force contour lines to close along the border.
var cliff = -2000;
data.push(d3.range(data[0].length).map(function() { return cliff; }));
data.unshift(d3.range(data[0].length).map(function() { return cliff; }));
data.forEach(function(d) {
  d.push(cliff);
  d.unshift(cliff);
});

var colors = ["#023858", "#045a8d", "#0570b0", "#3690c0", "#74a9cf", "#a6bddb", "#d0d1e6", "#fff", "#fed976", "#feb24c", "#fd8d3c", "#fc4e2a", "#e31a1c", "#bd0026", "#800026"]
var c = new Conrec,
    xs = d3.range(0, data.length),
    ys = d3.range(0, data[0].length),
    zs = d3.range(-20, 50, 1),
    x = d3.scaleLinear().range([0, width]).domain([0, data.length]),
    y = d3.scaleLinear().range([height, 0]).domain([0, data[0].length]),
    colours = d3.scaleLinear().domain(d3.range(-20,50,70/colors.length)).range(colors).interpolate(d3.interpolateLab);
c.contour(data, 0, xs.length-1, 0, ys.length - 1, xs, ys, zs.length, zs);

d3.select("#contour")
  .attr("transform", `translate(${margin.left},${margin.top})`)
  .selectAll("path")
    .data(c.contourList())
  .enter().append("path")
    .style("fill",function(d) { return colours(d.level);})
    //.style("stroke","red")
    .style("stroke-opacity","0")
    .attr("d", d3.line()
      .x(function(d) { return x(d.x); })
      .y(function(d) { return y(d.y); }));
      
  
          
function loadeps(json) {
    epsJson=json;
    //console.log(epsJson);
}

d3.json('assets/D3/epsData.json')
	.then(function(json) {
		loadeps(json)
	});
	

var cl1 = Legend(colours, {title: "Value", tickFormat: 1,  tickSize:6,width:320, });
document.getElementsByClassName('legend')[0].appendChild (cl1);


        

svg_plot=d3.select("#plot")
    .append("g")
    .attr("transform","translate(" + 140 + "," + margin.top + ")");
    
svg_plot.append("text").attr("text-anchor", "middle").attr("y", 12).attr("x", 500).attr("class", "fig_text_plt").style("font-size", "18px").text('緯度 : 24.0 經度 : 120.0'); 
d3.select("#content_2").append("text").attr("text-anchor", "middle").attr("y", 430).attr("x", 650).attr("class", "fig_text_plt").style("font-size", "18px").text('時間(未來72小時)'); 
d3.select("#content_2").append("text").attr("text-anchor", "middle").attr("y", 200).attr("x", 80).attr("class", "fig_text_plt").style("font-size", "18px").text('溫度');
  
var width2 = 1000 - margin.left - margin.right;
var height2 = 400 - margin.top - margin.bottom;        
var dates=[0,6,12,18,24,30,36,42,48,54,60,66,72]
var x = d3.scaleLinear()
  .domain(d3.extent(dates))
  .range([ 0, width2 ]);
svg_plot.append("g")
  .attr("transform", `translate(0, ${height2})`)
  .call(d3.axisBottom(x));
  

var y = d3.scaleLinear()
  .domain(d3.extent([20,30]))
  .range([ height2, 0 ]);      
svg_plot.append("g")
  .attr('class',"yaxis")
  .call(d3.axisLeft(y));
  
      
const color = d3.scaleOrdinal().range(['#888'])  

var focus = d3.select(".focus")
      .append('g')
      .append('circle')
        .style("fill", "none")
        .attr("stroke", "black")
        .attr('r', 8.5)
        .style("opacity", 0)
        
d3.json('assets/D3/epsData.json').then(function(json) {    
    svg1=d3.select("#eventLayer");
    svg1.append('rect')
      .style("fill", "none")
      .style("pointer-events", "all")   
      .attr('width', 800)
      .attr('height', 450)     
      .attr('class',"React")
      .on('mouseover', function () {
          let pt = d3.pointer(event, svg1.node())
          focus.style("opacity", 1)  
       })
        .on('mousemove', function () {
              let pt = d3.pointer(event, svg1.node());
              focus.attr("cx", pt[0]).attr("cy", pt[1]);          
              x0=parseInt(((pt[0]-6.5)/779)*120);
              y0=parseInt(((pt[1]-14)/428)*60);
              y0=60-y0;
              if (x0>=0 && y0>=0)
              {
                  var latText = d3.select(".fig_text");
                  latText.text('緯度 : '+((y0*0.5)+9).toFixed(1)+" 經度 : "+((x0*0.5)+90).toFixed(1));  

              }      
          //console.log(pt)             
            })
        .on('click', function () {
                let pt = d3.pointer(event, svg1.node())
                x0=parseInt(((pt[0]-6.5)/779)*120);
                y0=parseInt(((pt[1]-14)/428)*60);
                y0=60-y0;
                if (x0>=0 && y0>=0)
                {
                    updateCoor(x0,y0);
                    console.log(x0,y0);   
                    //t=x0+'_'+y0;
                    //console.log(epsJson["01"][t]);      
                }
                var latText2 = d3.select(".fig_text_plt");
                latText2.text('緯度 : '+((y0*0.5)+9).toFixed(1)+" 經度 : "+((x0*0.5)+90).toFixed(1));                  
            });  
            

    var x0=59;
    var y0=29; 
    var stats=[]
    setTimeout(function(){},5000);
    for (let i = 1; i < 21; i=i+1) {
            t1=i.toString().padStart(2, '0'); 
            t2=x0+'_'+y0;
            //console.log(json["01"][t2]);
            stats.push(json[t1][t2]);
        }
    var idx=-1;
    //console.log(stats);    
    const line = svg_plot
        .selectAll(".line")
        .data(stats)
        .enter()
        .append("path")
          .transition()
          .delay(500)         
          .duration(800)          
          .attr("fill", "none")
          .attr("stroke",function(d){ return color(0); })
          .attr('class',"sline")
          .attr("stroke-width", 1.5)
          .attr("d", function(d){
            idx=-1;
            return d3.line()
              .x(function(d) {idx+=1; return x(dates[idx]); })
              .y(function(d) {return y(d); })
              (d)
          })
          
    function updateCoor(x0,y0) {
        d3.selectAll(".yaxis").remove();
        var stats=[]
        setTimeout(function(){},5000);
        for (let i = 1; i < 21; i=i+1) {
                t1=i.toString().padStart(2, '0'); 
                t2=x0+'_'+y0;
                //console.log(json["01"][t2]);
                stats.push(json[t1][t2]);
            }
        var domainX=d3.extent(stats.flat())
        var y = d3.scaleLinear()
          .domain([domainX[0]-domainX[0]*0.1,domainX[1]+domainX[0]*0.1])
          .range([ height2, 0 ]);      
        svg_plot.append("g")
          .attr('class',"yaxis")
          .call(d3.axisLeft(y));         
             
        var idx=-1;
        //console.log(stats);    
        d3.selectAll(".sline").remove();
        const line = svg_plot
            .selectAll(".line")
            .data(stats)
            .enter()
            .append("path")
              .transition()
              .delay(500)         
              .duration(800)          
              .attr("fill", "none")
              .attr("stroke",function(d){ return color(0); })
              .attr('class',"sline")
              .attr("stroke-width", 1.5)
              .attr("d", function(d){
                idx=-1;
                return d3.line()
                  .x(function(d) {idx+=1; return x(dates[idx]); })
                  .y(function(d) {return y(d); })
                  (d)
              })
    }
    
    
    
});

    
    