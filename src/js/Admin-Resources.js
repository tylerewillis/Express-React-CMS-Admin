import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Layout from './_Components/Layout-Admin'

const Resources = React.memo(({ resources }) => {

	const [ active, setActive ] = useState('latest')

	const toggle = (tab) => {
		setActive(tab)
	}

	return (
		<div className='admin-vert-list'>
			<div className='avl-tabs'>
				<p className={(active === 'latest') ? 'avct-active' : ''} onClick={() => toggle('latest')}>Latest</p>
				<p className={(active === 'training') ? 'avct-active' : ''} onClick={() => toggle('training')}>Training</p>
				<p className={(active === 'performance') ? 'avct-active' : ''} onClick={() => toggle('performance')}>Performance</p>
				<p className={(active === 'compliance') ? 'avct-active' : ''} onClick={() => toggle('compliance')}>Compliance</p>
				<p className={(active === 'seo') ? 'avct-active' : ''} onClick={() => toggle('seo')}>SEO</p>
			</div>
			{/*********************/}
			<div className={(active === 'latest') ? 'avl-content avlc-active' : 'avl-content'}>
				{resources[0].latest.map((r,i) => {
					return <div className='avlc-post' key={i}>
						<h3>{r.title}</h3>
						<div dangerouslySetInnerHTML={{__html: r.html }} />
					</div>
				})}
			</div>
			{/*********************/}
			<div className={(active === 'training') ? 'avl-content avlc-active' : 'avl-content'}>
				{resources[0].training.map((r,i) => {
					return <div className='avlc-post' key={i}>
						<h3>{r.title}</h3>
						<div dangerouslySetInnerHTML={{__html: r.html }} />
					</div>
				})}
			</div>
			{/*********************/}
			<div className={(active === 'performance') ? 'avl-content avlc-active' : 'avl-content'}>
				{resources[0].performance.map((r,i) => {
					return <div className='avlc-post' key={i}>
						<h3>{r.title}</h3>
						<div dangerouslySetInnerHTML={{__html: r.html }} />
					</div>
				})}
			</div>
			{/*********************/}
			<div className={(active === 'compliance') ? 'avl-content avlc-active' : 'avl-content'}>
				{resources[0].compliance.map((r,i) => {
					return <div className='avlc-post' key={i}>
						<h3>{r.title}</h3>
						<div dangerouslySetInnerHTML={{__html: r.html }} />
					</div>
				})}
			</div>
			{/*********************/}
			<div className={(active === 'seo') ? 'avl-content avlc-active' : 'avl-content'}>
				{resources[0].seo.map((r,i) => {
					return <div className='avlc-post' key={i}>
						<h3>{r.title}</h3>
						<div dangerouslySetInnerHTML={{__html: r.html }} />
					</div>
				})}
			</div>
		</div>
	)
})

Resources.propTypes = {
	resources: PropTypes.array,
}

export default () => (
	<Layout>
		<Resources />
	</Layout>
)