import React from 'react'
import Table from './index'

const data = new Array(10000).join(',').split(',').map((it, i) => {
    return {
        id: i,
        salary: i,
    }
});
const columns = [
    { title: 'id', render: 'id', width: 80 },
    {
        title: 'Name',
        fixed: 'left',
        render: d => (
            <div style={{ height: d.height }}>
                {d.firstName} {d.lastName}
            </div>
        ),
        width: 160,
    },
    { title: 'Country', render: 'country', width: 200 },
    { title: 'Position', render: 'position' },
    { title: 'Office', render: 'office' },
    { title: 'Start Date', render: 'start', width: 140 },
]

for (let i = 0; i < 50; i++) {
    columns.push({
        title: `${i + 1}`,
        render: d => `$${d.salary.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')}`,
    })
}

export default function () {
    return (
        <Table
            fixed="both"
            keygen="id"
            width={6400}
            style={{ height: 600 }}
            columns={columns}
            data={data}
            rowsInView={15}
        />
    )
}