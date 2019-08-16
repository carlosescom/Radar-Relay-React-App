function assetFormat(assetAmountString, precission) {
    const assetAmount = assetAmountString.split('.')
    assetAmount[0] = assetAmount[0].replace(/\d(?=(\d{3})+\.)/g, '$&,')
    if (assetAmount.length == 1) assetAmount.push('0'.repeat(precission))
    assetAmount[1] = (assetAmount[1] + '0'.repeat(precission-1)).substr(0, precission)
    return assetAmount[0] + '.' + assetAmount[1]
}

export default assetFormat