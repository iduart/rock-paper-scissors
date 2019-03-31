const knex = require('../helpers/knex');

const find = async userId => {
  const query = `
    select u.id,
    max(u.name) as name,
    max(u.created_at) as created_at,
    coalesce(
      json_agg(
        distinct c.*
        )
      FILTER (WHERE c.id IS NOT NULL), '[]'
    ) as companies,
    coalesce(
      json_agg(distinct l.*)
      FILTER (WHERE l.id IS NOT NULL), '[]'
    ) as listings,
    (
      select coalesce(
        array_agg(
          json_build_object(
            'id', app.id,
            'created_at', app.created_at,
            'listing', json_build_object(
              'id', li.id,
              'name', li.name,
              'description', li.description
            ),
            'cover_letter', app.cover_letter
          )
        )
      )
      from applications app
      join listings li on li.id = app.listing_id
      where app.user_id = u.id
    ) as applications
    from users u
    left join teams t on t.user_id = u.id
    left join companies c on c.id = t.company_id
    left join listings l on l.created_by = u.id 
    where u.id = ${userId}
    group by u.id;
  `;

  return knex.raw(query);
};

const topActiveUsers = (offset, limit) => {
  const query = `
    select max(u.id) as id,
    max(u.created_at) as created_at,
    max(u.name) as name,
    count(distinct ap.listing_id) as count,
    (array_agg(DISTINCT l.name))[1:3] as listings
    from applications ap
    join users u on u.id = ap.user_id
    join listings l on l.id = ap.listing_id
    group by ap.user_id
    order by count desc
    offset ${offset} limit ${limit};
  `;
  return knex.raw(query);
};

module.exports = {
  find,
  topActiveUsers
};
