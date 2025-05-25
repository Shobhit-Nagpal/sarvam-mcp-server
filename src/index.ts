async function main() {
  console.log('Namaste, duniya :)')
}

main().catch(error => {
  console.error(`Server crashed with error: `, error)
  process.exit(1)
})
