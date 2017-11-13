update items
set item_name = $2,
    product_code = $3,
    cost = $4,
    retail = $5,
    quantity = $6,
    vendor = $7
where "id" = $1;