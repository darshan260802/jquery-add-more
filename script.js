var tableData = [];


function addChild(target) {
  let $target = $(target).parent().next();
  let $newChild = $("#child-input-template").html();
  $target.append($newChild);
}

function deleteChild(target){
    $(target).parent().remove();
}

function addMore(target) {
  let $target = $(target).parent();
  let $newNode = $("#main-input-template").html();
  $target
    .append($newNode)
    .children()
    .last()
    .attr("data-index", $(".container-left .container-input").length - 1);
}

function submit(target) {
  let $target = $(target).parent().parent();
  let index = $target.attr("data-index");
  tableData[index] = getData(index);
  updateTable(index)
}

function getData(index) {
  const data = {};
  let $target = $(`.container-input[data-index=${index}]`);
  data["id"] = index;
  data["title"] = $target.children().first().children().first().val();
  const children = [];
  $target
    .children()
    .last()
    .children()
    .each(function () {
      const subtitle = {};
      subtitle["subtitle"] = $(this).children().eq(0).val();
      subtitle["value"] = $(this).children().eq(1).val();
      children.push(subtitle);
    });
  data["children"] = children;
  return data;
}

function updateTable() {
  let $target = $("#table-parent");
  // Removes Existing tables
  $target.children().first().nextAll().remove();

  $(tableData).each(function(index,elem){
    if(!elem){
        return;
    }
    $target.append(`<table data-index=${index} ></table>`)
    let $newTable = $(`table[data-index=${index}]`);
    $newTable.append(`<tr><th colspan='2' >${elem.title}</th></tr>`)
    $(this.children).each(function() {
        $newTable.append(`
        <tr>
        <td>${this.subtitle}</td>
        <td>${this.value}</td>
        </tr>
        `)
    })
  })
}
