var table = new Tabulator("#userTable", {
   
    ajaxURL:'http://localhost:3000/api/users',

    
    ajaxResponse:function(url, params, response){
        

        return response.data; 
    },

       layout:"fitColumns",
     pagination:true,
    paginationSize:10,
    paginationSizeSelector:[10,25,50,100],
    placeholder:"No Data Set",
    columns:[
        {title:"Name", field:"name"},
        {title:"Email", field:"email"},
        {title:"Age", field:"age"},
        {
          title:"Actions" ,
          formatter:function(){
            return `
                 <button onclick="viewUser('${data}')">View</button>
                  <button onclick="updatewUser('${data}')">Update</button>
                   <button onclick="deleteUser('${data}')">Delete</button>
                
                `
          }

        }
        
    ],
});