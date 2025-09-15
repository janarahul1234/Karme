export default function calculateProgress(targetAmount, savedAmount = 0) {
  return (savedAmount / targetAmount) * 100;
}
