import React from 'react'
import { Link } from 'react-router-dom'
import styles from './ProductCard.module.css'

export default function ProductCard({ product }) {
  return (
    <Link
      to={`/products/${product.id}`}
      className={styles.card}
      aria-label={`View details for ${product.title}`}
    >
      <div className={styles.imageWrap}>
        <img className={styles.image} src={product.thumbnail || product.images?.[0]} alt={product.title} />
      </div>
      <div className={styles.body}>
        <h3 className={styles.title}>{product.title}</h3>
        <p className={styles.price}>${product.price}</p>
      </div>
    </Link>
  )
}
