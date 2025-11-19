import React, { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard'
import styles from './ProductList.module.css'

const ITEMS_PER_PAGE = 4

export default function ProductList() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [page, setPage] = useState(1)

  useEffect(() => {
    let mounted = true
    setLoading(true)
    fetch('https://dummyjson.com/products')
      .then((res) => {
        if (!res.ok) throw new Error('Network response was not ok')
        return res.json()
      })
      .then((data) => {
        if (mounted) {
          setProducts(data.products || [])
          setLoading(false)
        }
      })
      .catch((err) => {
        if (mounted) {
          setError(err.message)
          setLoading(false)
        }
      })
    return () => (mounted = false)
  }, [])

  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE)
  const start = (page - 1) * ITEMS_PER_PAGE
  const current = products.slice(start, start + ITEMS_PER_PAGE)

  const goPrev = () => setPage((p) => Math.max(1, p - 1))
  const goNext = () => setPage((p) => Math.min(totalPages, p + 1))

  if (loading) return <div className="container">Loading products...</div>
  if (error) return <div className="container">Error: {error}</div>

  return (
    <div className="container" role="main">
      <header className={styles.header}>
        <h1>Product Catalog</h1>
        <p className={styles.subtitle}>Discover our amazing products</p>
      </header>

      <div className={styles.grid}>
        {current.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>

      <div className={styles.paginationWrapper}>
        <div className={styles.pagination}>
          <button onClick={goPrev} disabled={page === 1} className={styles.pill} aria-label="Previous page"><span style={{ marginRight: "10px"}}>‹</span>Previous</button>
          <span className={styles.pageInfo}>Page {page} of {totalPages}</span>
          <button onClick={goNext} disabled={page === totalPages || totalPages === 0} className={styles.pill} aria-label="Next page">Next <span style={{ marginLeft: "5px"}}>›</span></button>
        </div>
      </div>
    </div>
  )
}
