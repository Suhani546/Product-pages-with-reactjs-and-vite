import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import styles from './ProductDetail.module.css'

export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let mounted = true
    setLoading(true)
    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Network response was not ok')
        return res.json()
      })
      .then((data) => {
        if (mounted) {
          setProduct(data)
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
  }, [id])

  if (loading) return <div className="container">Loading product...</div>
  if (error) return <div className="container">Error: {error}</div>
  if (!product) return <div className="container">Product not found</div>

  const discountBadge = product.discountPercentage ? `-${product.discountPercentage}% OFF` : null

  return (
    <div className="container">
      <div className={styles.detailWrap} role="main">
        <button onClick={() => navigate(-1)} className={styles.backLink} aria-label="Back to products"><span style={{ marginRight: "3px", paddingTop: "1px" }}>← </span> Back to Products</button>

        <div className={styles.detailCard}>
          <div className={styles.left}>
            <div className={styles.imageWrap}>
              <img className={styles.image} src={product.thumbnail || product.images?.[0]} alt={product.title} />
            </div>
          </div>

          <div className={styles.right}>
            <div className={styles.titleRow}>
              <h1 className={styles.title}>{product.title}</h1>
              <div className={styles.stockPill}>{product.stock} in stock</div>
            </div>

            <div className={styles.badges}>
              <span className={styles.badge}>{product.brand}</span>
              <span className={styles.badge}>{product.category}</span>
            </div>

            <div className={styles.ratingRow}>
              <span className={styles.star}>★</span>
              <span className={styles.rating}>{product.rating} / 5.0</span>
            </div>

            <div className={styles.priceRow}>
              <div className={styles.price}>${product.price}</div>
              {discountBadge && <div className={styles.discount}>{discountBadge}</div>}
            </div>

            <h3 className={styles.sectionTitle}>Description</h3>
            <p className={styles.description}>{product.description}</p>

            <button className={styles.addButton} aria-label={`Add ${product.title} to cart`}>Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  )
}
