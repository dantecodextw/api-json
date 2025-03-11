#### **Task:**  
Create a **Node.js + Express API** that performs **CRUD** operations using a **JSON file as the database** instead of a traditional database like MongoDB or MySQL.

---

### **Requirements:**  
1. Implement an Express server with a **RESTful API** to manage items.  
2. Store the data in a `data.json` file.  
3. The API should have the following endpoints:  

   ✅ **GET /items** → Fetch all items  
   ✅ **GET /items/:id** → Fetch a specific item by ID  
   ✅ **POST /items** → Create a new item (Request body: `{ "name": "Item Name" }`)  
   ✅ **PUT /items/:id** → Update an existing item (Request body: `{ "name": "Updated Name" }`)  
   ✅ **DELETE /items/:id** → Remove an item by ID  

4. If the file does not exist or is empty, initialize it with an **empty array** (`[]`).  
5. Implement error handling for:  
   - Missing fields in the request body  
   - Invalid ID  
   - JSON file read/write errors  

---

### **Sample JSON File (`data.json`)**  

```json
[
  {
    "id": 1,
    "name": "Item 1"
  },
  {
    "id": 2,
    "name": "Item 2"
  }
]
```