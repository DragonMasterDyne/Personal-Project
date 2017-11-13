select *
from catagory
join items 
	on catagory.itemID = items.ID
	where cat_type = $1;